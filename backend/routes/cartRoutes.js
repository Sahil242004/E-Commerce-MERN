import express from "express";
import {
  addToCart,
  updateCart,
  getUserCart,
} from "../controllers/cartController.js";
import authUser from "../middlewares/auth.js";

const cartRouer = express.Router();

cartRouer.post("/add", authUser, addToCart);
cartRouer.post("/update", authUser, updateCart);
cartRouer.post("/get", authUser, getUserCart);

export default cartRouer;
