import express from "express";
import upload from "../middlewares/multer.js";
import {
  addProduct,
  removeProduct,
  removeAllProduct,
  getAllProducts,
  getSingleProduct,
} from "../controllers/productController.js";
import adminAuth from "../middlewares/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.delete("/delete", adminAuth, removeProduct);
// productRouter.patch("/update/:id", updateProduct);
productRouter.get("/all", getAllProducts);
productRouter.post("/single", getSingleProduct);
productRouter.delete("/ALLdelete", removeAllProduct);

export default productRouter;
