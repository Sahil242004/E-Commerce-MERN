import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../componenets/Title";
import ProductItem from "../componenets/ProductItem";

const Collections = () => {
  let [showFilter, sethowFilter] = useState(false);
  let [filterProducts, setFilterProducts] = useState([]);
  let [category, setCategory] = useState([]);
  let [subCategory, setSubCategory] = useState([]);
  let [sortType, setSortType] = useState("relavent");
  const { products, search, showSearch } = useContext(ShopContext);

  const handleCategoryToggle = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(category.filter((eachVal) => eachVal !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const handleSubCategoryToggle = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(
        subCategory.filter((eachVal) => eachVal !== e.target.value)
      );
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };
  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // setFilterProducts(productsCopy);
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  useEffect(() => {
    applyFilter();
    // console.log(products);
  }, [category, subCategory, search, showSearch, products]);

  // useEffect(() => {
  //   // console.log(category);
  //   // console.log(subCategory);
  //   // console.log(products);
  //   // console.log(products);
  // }, [category, subCategory]);
  // console.log(filterProducts);

  // useEffect(() => {
  //   // console.log("printing filter products" + filterProducts);
  // }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => sethowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
          />
        </p>
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={handleCategoryToggle}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={handleCategoryToggle}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onChange={handleCategoryToggle}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        {/* subcategory filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={handleSubCategoryToggle}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={handleSubCategoryToggle}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onChange={handleSubCategoryToggle}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value={"relavent"}>Sort by : Relavent</option>
            <option value={"low-high"}>Sort by : Low to High</option>
            <option value={"high-low"}>Sort by : High to Low</option>
          </select>
        </div>
        {/* map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
