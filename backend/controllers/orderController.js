import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import razorpay from "razorpay";

// global varables
const currency = "inr";
const deliveryCharges = 10;

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// place order using COD method
// extracts userId, items, amount, address from request body, creates a new order in the order model, clears the user's cartData, and returns success message -> input { userId, items, amount, address } and output { success, message }
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "order placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// place order using Stripe
// extracts userId, items, amount, address from request body, creates a new order in the order model, prepares line items for Stripe checkout, and returns the session URL for payment -> input { userId, items, amount, address } and output { success, session_url }
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    let line_item = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    line_item.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items: line_item,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// verify stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Order placed successfully" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Order cancelled" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// place order using Razorpay
// extract userId, items, amount, address from request body, creates a new order in the order model, prepares options for Razorpay payment order, and  It sends the Razorpay order details to the frontend so the user can complete the payment, returns the order details -> input { userId, items, amount, address } and output { success, order }

const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    await razorpayInstance.orders.create(options, async (err, order) => {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: err.message });
      } else {
        res.json({ success: true, order });
      }
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: err.message });
  }
};

// verify razorpay
// This function verifies the Razorpay payment status. If the payment is successful, it marks the order as paid in the database and clears the user’s cart.
const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;
    // console.log(razorpay_order_id);
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Payment Successfull" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// All orders data for admin panel
// This function retrieves all orders from the database and returns them to the admin panel.s
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User order data for frontend
// This function retrieves all orders for a specific user from the database and returns them to the frontend.
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update orderStatus from admin panel
// This function updates the status of an order based on the orderId and status provided in the request body.
// It updates the order status in the database and returns a success message.
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: error.message });
  }
};

export {
  updateStatus,
  userOrders,
  allOrders,
  placeOrderRazorpay,
  placeOrderStripe,
  placeOrder,
  verifyStripe,
  verifyRazorpay,
};
