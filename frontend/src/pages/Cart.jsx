import React, { useContext, useEffect } from "react";
import ShopContext from "../context/ShopContext";
import { useState } from "react";
import Title from "../componenets/Title";
import { assets } from "../assets/assets";
import CartTotal from "../componenets/CartTotal";
import { toast } from "react-toastify";

const Cart = () => {
  let { products, cartItem, currency, updateQuantity, navigate, token } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let tempData = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItem[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }

    // console.log("printing cart items", cartItem);

    // console.log("cart Dta");
    // console.log(cartData);
  }, [cartItem, products]);
  // console.log("printig fart data");
  // console.log(cartData);
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          // console.log("printing products....");
          // console.log(products);
          let productData = products.find(
            (product) => product._id === item._id
          );
          // console.log("Printing..");
          // console.log(productData);
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={productData.image[0]} />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                onChange={(e) => {
                  let value = e.target.value;
                  if (!value || value === "0") return;
                  updateQuantity(item._id, item.size, Number(value));
                }}
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => {
                if (token) return navigate("/place-order");
                toast.error("Please Log in");
                navigate("/login");
              }}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
