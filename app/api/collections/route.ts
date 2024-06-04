import Collection from "@/lib/models/collectionModel";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { 
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDB();

    const { title, description, images } = await req.json();

    if (!title || !images) {
      return new NextResponse(JSON.stringify({ message: "Title and images are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existingCollection = await Collection.findOne({ title });

    if (existingCollection) {
      return new NextResponse(JSON.stringify({ message: "Collection already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newCollection = await Collection.create({
      title,
      description,
      image:images,
      
    })


    await newCollection.save();

    return new NextResponse(JSON.stringify({ message: "Success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[Collection POST] Error:", error);
    return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const GET=async(req:NextRequest)=>{
  try {
    await connectToDB();
    const collections=await Collection.find().sort({createdAt:"desc"});
    return NextResponse.json(collections,{status:200});
  } catch (error) {
    console.error("[Collection GET] Error:", error);
    return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}