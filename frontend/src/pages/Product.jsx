import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShopContext from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../componenets/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  let [productData, setProductData] = useState(false);
  let [image, setImage] = useState("");
  let [size, setSize] = useState("");
  const { products, currency, addToCart } = useContext(ShopContext);

  let fetchProductData = async () => {
    products.map((item) => {
      if (item._id == productId) {
        setProductData(item);
        setImage(item.image[0]);
        // console.log("Printing data");
        console.log(item);
        return null;
      }
    });
  };

  let addToCartButton = (id, size) => {
    if (size == "") {
      return toast.error("Please select product size!");
    }
    addToCart(id, size);
    return toast.success("Item added to cart");
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="" />
          </div>
        </div>
        {/* -------------product info---------------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    size == item ? "border-black border-2" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCartButton(productData._id, size)}
            className="bg-gray-700 text-white px-8 py-3 text-sm active:bg-gray-500"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delvery is avaliable on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* ------------- description and review section ----------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque ut
            dicta velit quidem aperiam, adipisci placeat. Aspernatur, qui
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            odio porro, tempore natus fugit debitis rerum quod expedita
            reiciendis repudiandae modi nesciunt necessitatibus, earum accusamus
            illum corporis. Nesciunt, temporibus totam.
          </p>
        </div>
        {/* -------------display related products ---------------- */}
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
