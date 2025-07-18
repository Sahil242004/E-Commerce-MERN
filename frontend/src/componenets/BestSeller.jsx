import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import Product from "../pages/Product";

const BestSeller = () => {
  let { products } = useContext(ShopContext);
  let [bestSellerProduct, setBestSellerProduct] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSellerProduct(bestProduct);
  }, [products]);

  //   console.log(bestSeller);

  return (
    <div className="my-20">
      <div className="text-center py-8 text-3xl">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-3/4 m-auto text-xs  sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem qui
          repellendus, hic ab velit
        </p>
      </div>
      {/* products down */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 my-8">
        {bestSellerProduct.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
