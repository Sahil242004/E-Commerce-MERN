// getting-started.js
import mongoose from "mongoose";
import "dotenv/config";

connectdb().catch((err) => console.log(err));

async function connectdb() {
  await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
  console.log("MongoDB connected successfully");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

export default connectdb;
