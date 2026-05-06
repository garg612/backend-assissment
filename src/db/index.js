import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
const connectDB = async () => {
  try {
    const baseUri = process.env.MONGODB_URI?.replace(/\/+$/, "");

    if (!baseUri) {
      throw new Error("MONGODB_URI is not set");
    }

    const connectionInstance = await mongoose.connect(
      `${baseUri}/${DB_NAME}`
    );

    console.log(
      `MongoDB Connected: ${connectionInstance.connection.host}`
    );

  } catch (error) {

    console.error("MongoDB connection failed:", error.message);

    process.exit(1);

  }
};

export default connectDB;