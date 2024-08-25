import { NextRequest, NextResponse } from "next/server";
import  { auth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/collectionModel";
import Product from "@/lib/models/productModel";


export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    console.log("collectionId", params.collectionId);
    const { userId } = auth();
    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    await connectToDB();
    console.log("collectionId", params.collectionId);
    await Collection.findByIdAndDelete(params.collectionId);
    await Product.updateMany({ collections: params.collectionId }, { $pull: { collections: params.collectionId } });
    return new NextResponse(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (err) {
    console.log("[collection_Id_Delete] Error:", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export const GET = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
  try {
        const collection = await Collection.findById(params.collectionId);
       
        return new NextResponse(JSON.stringify(collection), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
        ;
      }catch(err){
        console.log("[collection_Id_Get] Error:", err);
        return new NextResponse("Internal error", { status: 500 });
      }
       
    }
    export const POST = async (
      req: NextRequest,
      { params }: { params: { collectionId: string } }
    ) => {
      try {
        const { userId } = auth();
    
        if (!userId) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
    
        await connectToDB();
    
        let collection = await Collection.findById(params.collectionId);
    
        if (!collection) {
          return new NextResponse("Collection not found", { status: 404 });
        }
    
        const { title, description, image } = await req.json();
    
        if (!title || !image) {
          return new NextResponse("Title and image are required", { status: 400 });
        }
    
        collection = await Collection.findByIdAndUpdate(
          params.collectionId,
          { title, description, image },
          { new: true }
        );
     
        await collection.save();
    
        return NextResponse.json(collection, { status: 200 });
      } catch (err) {
        console.log("[collectionId_POST]", err);
        return new NextResponse("Internal error", { status: 500 });
      }
    };
    
