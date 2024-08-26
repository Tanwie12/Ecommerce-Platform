import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { connectToDB } from "@/lib/mongoDB"; // Ensure you have a module to handle DB connection
import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order"// Import the Customer model

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { cartItems, customer, shippingAddress } = await req.json();

    if (!cartItems || !customer || !shippingAddress) {
      return new NextResponse("Not enough data to checkout", {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [
        { shipping_rate: "shr_1Prs3Q2K1bjc3qd8ZPsFsN4h" },
        { shipping_rate: "shr_1Prs852K1bjc3qd8Gqm3Lqv7" },
      ],
      line_items: cartItems.map((cartItem: any) => ({
        price_data: {
          currency: "cad",
          product_data: {
            name: cartItem.item.title,
            metadata: {
              productId: cartItem.item._id,
              ...(cartItem.size && { size: cartItem.size }),
              ...(cartItem.color && { color: cartItem.color }),
            },
          },
          unit_amount: cartItem.item.price * 100,
        },
        quantity: cartItem.quantity,
      })),
      client_reference_id: customer.clerkId,
      success_url: `${process.env.ECOMMERCE_STORE_URL}/payment_success`,
      cancel_url: `${process.env.ECOMMERCE_STORE_URL}/cart`,
    });

    // Connect to the database
    await connectToDB();

    // Create a new order
    const newOrder = new Order({
      customerClerkId: customer.clerkId,
      products: cartItems.map((cartItem: any) => ({
        product: cartItem.item._id, // Assuming you have product IDs in your cart items
        color: cartItem.color,
        size: cartItem.size,
        quantity: cartItem.quantity,
      })),
      shippingAddress,
      shippingRate: session.shipping_cost?.shipping_rate,
      totalAmount: session.amount_total ? session.amount_total / 100 : 0, // Convert from cents to dollars
    });

    // Save the new order
    await newOrder.save();
    console.log("Order created:", newOrder);

    // Find or create the customer
    let existingCustomer = await Customer.findOne({ clerkId: customer.clerkId });

    if (existingCustomer) {
      existingCustomer.orders.push(newOrder._id);
    } else {
      existingCustomer = new Customer({
        ...customer,
        orders: [newOrder._id],
      });
    }

    // Save the customer
    await existingCustomer.save();
    console.log("Customer updated/created:", existingCustomer);

    // Return the Stripe session
    return NextResponse.json(session, { headers: corsHeaders });
  } catch (err) {
    console.error("[checkout_POST]", err);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
}
