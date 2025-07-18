import express from "express";
import {
  updateStatus,
  userOrders,
  allOrders,
  placeOrderRazorpay,
  placeOrderStripe,
  placeOrder,
  verifyStripe,
  verifyRazorpay,
} from "../controllers/orderController.js";
import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";

const orderRouter = express.Router();

// admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// payment features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// user features
orderRouter.post("/userOrders", authUser, userOrders);

// verify payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);

export default orderRouter;
