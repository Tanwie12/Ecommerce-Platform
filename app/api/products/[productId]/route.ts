import { NextRequest, NextResponse } from "next/server";
import  { auth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/productModel";
import Collection from "@/lib/models/collectionModel";


export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    console.log("productId", params.productId);
    const { userId } = auth();
    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    await connectToDB();

    const product=await Product.findById(params.productId)
    
if(!product){
  return new NextResponse(JSON.stringify({message:"product not found"}),{status:404})
}
   
    await Promise.all(
      product.collections.map((collectionId:string)=>
        Collection.findByIdAndUpdate(collectionId,{
          $pull:{products:product._id},
        })
      )
    )

    await Product.findByIdAndDelete(params.productId);
    return new NextResponse(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (err) {
    console.log("[product_Id_Delete] Error:", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
        const product = await Product.findById(params.productId).populate("collections");
       
        return new NextResponse(JSON.stringify(product), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
        ;
      }catch(err){
        console.log("[product_Id_Get] Error:", err);
        return new NextResponse("Internal error", { status: 500 });
      }
       
    }
    
    export const POST = async (
      req: NextRequest,
      { params }: { params: { productId: string } }
    ) => {
      try {
        const { userId } = auth();
    
        if (!userId) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
    
        await connectToDB();
    
        const product = await Product.findById(params.productId);
    
        if (!product) {
          return new NextResponse(JSON.stringify({ message: "Product not found" }), {
            status: 404,
          });
        }
    
        const {
          title,
          description,
          media,
          category,
          collections,
          tags,
          sizes,
          colors,
          price,
          expense,
        } = await req.json();
    
        if (!title || !description || !media || !category || !price || !expense) {
          return new NextResponse("Not enough data to create a new product", {
            status: 400,
          });
        }
    
        const addedCollections = collections.filter(
          (collectionId: string) => !product.collections.includes(collectionId)
        );
    
        const removedCollections = product.collections.filter(
          (collectionId: string) => !collections.includes(collectionId)
        );
    
        // Update collections
        await Promise.all([
          ...addedCollections.map((collectionId: string) =>
            Collection.findByIdAndUpdate(collectionId, {
              $push: { products: product._id },
            })
          ),
          ...removedCollections.map((collectionId: string) =>
            Collection.findByIdAndUpdate(collectionId, {
              $pull: { products: product._id },
            })
          ),
        ]);
    
        // Update product
        const updatedProduct = await Product.findByIdAndUpdate(
          product._id,
          {
            title,
            description,
            media,
            category,
            collections,
            tags,
            sizes,
            colors,
            price,
            expense,
          },
          { new: true }
        ).populate({ path: "collections", model: Collection });
    
        return NextResponse.json(updatedProduct, { status: 200 });
      } catch (err) {
        console.error("[productId_POST]", err);
        return new NextResponse("Internal server error", { status: 500 });
      }
    };
    
