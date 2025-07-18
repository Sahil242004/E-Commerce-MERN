import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true); // Start loading
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", JSON.stringify(bestseller));
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      console.log("printing from data...");
      // for (let pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: { token },
        }
      );
      if (response.data.success === true) {
        toast.success("Product added succesfully");
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setSizes([]);
        setBestseller(false);
        setCategory("Men");
        setSubCategory("Topwear");
      } else {
        toast.error(response.data.message);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading regardless of success/failure
    }
  };

  useEffect(() => {
    // console.log(sizes);
    console.log(bestseller);
  }, [bestseller]);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col w-full items-start gap-3 ${
          loading ? "blur-[2px]" : ""
        }`}
      >
        {/* -------------------- */}
        <div>
          <p className="mb-2">Upload image</p>
          <div className="flex gap-2">
            <label htmlFor="image1">
              <img
                className="w-20"
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>
            <label htmlFor="image2">
              <img
                className="w-20"
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                hidden
              />
            </label>
            <label htmlFor="image3">
              <img
                className="w-20"
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                hidden
              />
            </label>
            <label htmlFor="image4">
              <img
                className="w-20"
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>
        <div className="w-full">
          <p className="mb-2">Product Name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            required
            placeholder="name"
          />
        </div>
        <div className="w-full">
          <p className="mb-2">Product Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            required
            placeholder="descriptin"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div className="">
            <p className="mb-2">Product category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full px-3 py-2"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="">
            <p className="mb-2">Product sub-category</p>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              value={subCategory}
              className="w-full px-3 py-2"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Product price</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full px-3 py-2 sm:w-[120px]"
              type="number"
              required
              placeholder="price"
            />
          </div>
        </div>
        <div>
          <p className="mb-2">Product size</p>
          <div className="flex gap-3">
            <div>
              <p
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("S")
                      ? prev.filter((item) => item !== "S")
                      : [...prev, "S"]
                  )
                }
                className={`${
                  sizes.includes("S") ? "bg-pink-200" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                S
              </p>
            </div>
            <div>
              <p
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("M")
                      ? prev.filter((item) => item !== "M")
                      : [...prev, "M"]
                  )
                }
                className={`${
                  sizes.includes("M") ? "bg-pink-200" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                M
              </p>
            </div>
            <div>
              <p
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("L")
                      ? prev.filter((item) => item !== "L")
                      : [...prev, "L"]
                  )
                }
                className={`${
                  sizes.includes("L") ? "bg-pink-200" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                L
              </p>
            </div>
            <div>
              <p
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("XL")
                      ? prev.filter((item) => item !== "XL")
                      : [...prev, "XL"]
                  )
                }
                className={`${
                  sizes.includes("XL") ? "bg-pink-200" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                XL
              </p>
            </div>
            <div>
              <p
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("XXL")
                      ? prev.filter((item) => item !== "XXL")
                      : [...prev, "XXL"]
                  )
                }
                className={`${
                  sizes.includes("XXL") ? "bg-pink-200" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                XXL
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
          />
          <label className="cursor-pointer" htmlFor="bestseller">
            Add to best seller
          </label>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-28 py-3 mt-4 bg-black text-white"
        >
          Add
        </button>
      </form>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Add;
