import express from "express";
import { createProductController } from "./dependencies";

export const productRouter = express.Router();

// Rutas
productRouter.post("/", createProductController.run.bind(createProductController));
export default productRouter;