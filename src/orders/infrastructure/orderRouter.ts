import express from "express";
import { createOrderController, getOrderController, getOrdersByStatusController, deleteOrderController} from "./dependencies";

export const orderRouter = express.Router();


orderRouter.post("/", createOrderController.run.bind(createOrderController));
orderRouter.get("/:id", getOrderController.run.bind(getOrderController));
orderRouter.get("/", getOrdersByStatusController.run.bind(getOrdersByStatusController));

orderRouter.delete("/:id", deleteOrderController.run.bind(deleteOrderController));

export default orderRouter;