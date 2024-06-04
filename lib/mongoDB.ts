import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  const mongoDBUrl = process.env.MONGODB_URL;

  if (!mongoDBUrl) {
    throw new Error("MongoDB connection string is not defined in environment variables");
  }

  if (!mongoDBUrl.startsWith("mongodb://") && !mongoDBUrl.startsWith("mongodb+srv://")) {
    throw new Error("Invalid MongoDB connection string scheme, expected to start with 'mongodb://' or 'mongodb+srv://'");
  }

  try {
    await mongoose.connect(mongoDBUrl, {
      dbName: "Borcelle_Admin"
    });

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (err) {
    console.error("[Database error]", err);
    throw err;
  }
};
