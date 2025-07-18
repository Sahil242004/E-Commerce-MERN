import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// import { products } from "../assets/assets";
//
import ShopContext from "./ShopContext";
import { useNavigate } from "react-router-dom";
let ShopContextProvider = (props) => {
  let currency = "₹";
  let delivery_fee = 10;
  let backendUrl = import.meta.env.VITE_BACKEND_URL;
  let [search, setSearch] = useState("");
  let [showSearch, setShowSearch] = useState(false);
  let [cartItem, setCartItem] = useState({});
  const [products, setProducts] = useState([]);
  let navigate = useNavigate();
  let [token, setToken] = useState("");

  const getCartItemsCount = () => {
    let totalCount = 0;
    for (const item in cartItem) {
      for (const sizes in cartItem[item]) {
        try {
          if (cartItem[item][sizes] > 0) {
            totalCount += cartItem[item][sizes];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  const addToCart = async (itemId, size) => {
    // console.log("item id is", itemId);
    let cartData = structuredClone(cartItem);

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
    console.log("printing cart data", cartData);
    setCartItem(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  // useEffect(() => {
  //   console.log(cartItem);
  // }, [cartItem]);

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/all");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        console.log(response.data.cartData);
        setCartItem(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  });

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, [token]);

  let value = {
    currency,
    delivery_fee,
    products,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    setCartItem,
    addToCart,
    getCartItemsCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
