import mongoose from "mongoose";

let productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean, default: false },
  date: { type: Number, required: true },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;

// {
//     _id: "aaabg",
//     name: "Girls Round Neck Cotton Top",
//     description:
//       "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//     price: 230,
//     image: [p_img33],
//     category: "Kids",
//     subCategory: "Topwear",
//     sizes: ["S", "M", "L", "XL"],
//     date: 1716647545448,
//     bestseller: false,
//   },
