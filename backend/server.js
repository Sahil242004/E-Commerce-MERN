// npm i express cors dotenv multer jsonwebtoken mongoose nodemon razorpay stripe validator clodudinary bcrypt
// folders created config, middlewares, models, controllers, routes
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectdb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const PORT = process.env.PORT || 4000;
connectdb(); // connect to mongodb
connectCloudinary(); // connect to cloudinary

// middlewares
app.use(cors());
app.use(express.json());

// api endpoints
app.use("/api/user", userRouter); // user routes
app.use("/api/product", productRouter); // product routes
app.use("/api/cart", cartRouter); // cart routes
app.use("/api/order", orderRouter); // cart routes

app.get("/", (req, res) => {
  res.send("API RUNNNING");
});

app.listen(PORT, () => console.log(`App is listening of port ${PORT}`));
