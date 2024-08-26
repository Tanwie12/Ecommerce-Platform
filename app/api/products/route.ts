import Product from '@/lib/models/productModel';
import { connectToDB } from '@/lib/mongoDB';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import Collection from '@/lib/models/collectionModel';
export const POST=async(req: NextRequest)=>{
    try {
        const {userId}=auth()
        if(!userId){
            return new Response("Unauthorized", { status: 401 });
        }
        await connectToDB()
        const {title,description,media,category,collections,tags,sizes,price,cost,colors } = await req.json();
   
        if(!title || !description || !media || !category  || !price || !cost){
            return NextResponse.json("Not enough dat to create product fille all field", { status: 400 });
        }
        const existingProduct=await Product.findOne({title})
        if(existingProduct){
            return new NextResponse(JSON.stringify({ message: "product already exists, change title" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
              });
        }
        const newProduct=await Product.create({
            title,
            description,
            media,
            category,
            collections,
            tags,
            sizes,
            price,
            cost,
            colors 

        })
        await newProduct.save()
        if (collections) {
          for (const collectionId of collections) {
            const collection = await Collection.findById(collectionId);
            if (collection) {
              collection.products.push(newProduct._id);
              await collection.save();
            }
          }}
        return  NextResponse.json(newProduct,{status:200})
        
    } catch (error) {
        console.log("[Product_post]", error);
        return new Response("Error", { status: 500 });
        
    }
}

export const GET = async (req: NextRequest) => {
    try {
      await connectToDB();
  
      const products = await Product.find()
        .sort({ createdAt: "desc" })
        .populate({ path: "collections", model: Collection });
  
      return NextResponse.json(products, { status: 200 });
    } catch (err) {
      console.log("[products_GET]", err);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };