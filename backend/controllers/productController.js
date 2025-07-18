import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productsModel.js";

// extracts product details from request body, uploads images to cloudinary, saves product to the database, and returns success message -> input { name, description, price, category, subCategory, sizes, image1, image2, image3, image4 } and output { success, message }
const addProduct = async (req, res) => {
  try {
    let { name, description, price, category, subCategory, sizes, bestseller } =
      req.body;

    console.log("besteller", bestseller);

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const image = [image1, image2, image3, image4].filter(
      (image) => image !== undefined
    );

    let imageUrls = await Promise.all(
      image.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // console.log(imageUrls);

    const productData = {
      name,
      description,
      price,
      image: imageUrls,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
    };
    // console.log(productData);
    const product = new productModel(productData);
    await product.save();
    // console.log(product);
    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// rund a find query to get all products from the database and return them -> output { success, products: [{ name, description, price, category, subCategory, sizes, image }] }
const getAllProducts = async (req, res) => {
  try {
    let products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// extracts product id from request body, finds the product in the database, deletes it, and returns success message -> input { id } and output { success, message }
const removeProduct = async (req, res) => {
  // console.log("req recieved for deletion");
  try {
    let { id } = req.body;
    await productModel.findByIdAndDelete(id).then((product) => {
      if (product) {
        res.json({ success: true, message: "Product removed successfully" });
      } else {
        res.json({ success: false, message: "Product not found" });
      }
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// extracts product id from request body, finds the product in the database, retrieves it, and returns the product details -> input { id } and output { success, product: { name, description, price, category, subCategory, sizes, image } }
const getSingleProduct = async (req, res) => {
  try {
    let { id } = req.body;
    let product = await productModel.findById(id).then((product) => {
      if (product) {
        res.json({ success: true, product });
      } else {
        res.json({ success: false, message: "Product not found" });
      }
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// api to remove all products from the database
const removeAllProduct = async (req, res) => {
  try {
    await productModel.deleteMany({});
    res.json({ success: true, message: "All products removed successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export {
  addProduct,
  removeProduct,
  removeAllProduct,
  getAllProducts,
  getSingleProduct,
};
