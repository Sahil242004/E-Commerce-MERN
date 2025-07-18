import userModel from "../models/userModel.js";

// add product to user cart

// extract userId, itemId, size from request body, check if user exists, update cartData in user model, and return updated cartData -> input { userId, itemId, size } and output { success, message, cartData }
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    console.log("user data is", userData);
    let cartData = userData.cartData;
    console.log("cart data is", cartData);

    // check if cartData already has the itemId and size, if yes, increment the quantity, if not, add it with quantity 1
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Product added to cart", cartData });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// extracts userId, itemId, size, amount from request body, then sets the qunatity in cartData object (which is present inside userData) to the quantity provided, and returns the updated cartData -> input { userId, itemId, size, quantity } and output { success, message, cartData }
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Product quantity updated", cartData });
  } catch (error) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// extracts userId from request body, retrieves the cartData from user model, and returns it -> input { userId } and output { success, cartData }
const getUserCart = async (req, res) => {
  try {
    // console.log("getting user cart data");
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export { addToCart, updateCart, getUserCart };
