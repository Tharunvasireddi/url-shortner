import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URL;

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(url);
    console.log(`mongo db is connected successfully :${conn.connection.host}`);
  } catch (error) {
    console.error(`Error :${error.message}`);
  }
};

export { connectDb };
