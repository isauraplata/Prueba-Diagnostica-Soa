import express from "express";
import { createProductController, deleteProductController, getAllProductsController, updateProductController, getBestSellerController } from "./dependencies";

export const productRouter = express.Router();

// Rutas
productRouter.post("/", createProductController.run.bind(createProductController));

productRouter.delete("/:id", deleteProductController.run.bind(deleteProductController));

productRouter.get("/", getAllProductsController.run.bind(getAllProductsController));

productRouter.get("/best-seller", getBestSellerController.run.bind(getBestSellerController));

productRouter.put("/:id", updateProductController.run.bind(updateProductController));

export default productRouter;