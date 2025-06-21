import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("config/.env") });
const DB_URL = process.env.MONGODB_URI;
const connectionDB = async () => {
  await mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Connected To Mongo DB...");
    })
    .catch((err) => {
      console.log("Failed Connection To MongoDB...");
    });
};

export default connectionDB;
