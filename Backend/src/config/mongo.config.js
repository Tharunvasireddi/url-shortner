import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URL;

const connectDb = async () => {
  try {
    // Check if MONGO_URL exists
    if (!url) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }

    console.log("🔍 Attempting to connect to MongoDB...");
    console.log("🔍 MongoDB URL:", url.substring(0, 20) + "...");

    const conn = await mongoose.connect(url, {
      // Add these options for better connection handling
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`);
    console.log(`✅ Database name: ${conn.connection.name}`);

    // Add connection event listeners
    mongoose.connection.on("error", (error) => {
      console.error("❌ MongoDB connection error:", error);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected");
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error("   - Error message:", error.message);
    console.error("   - Full error:", error);

    // Exit the process if database connection fails
    process.exit(1);
  }
};

export { connectDb };
