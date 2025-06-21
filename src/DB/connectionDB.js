import mongoose from "mongoose";

const connectionDB = async () => {
  const DB_URL = process.env.MONGODB_URI;

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
