import { Request, Response } from "express";
import { GetOrdersByStatus } from "../../application/getOrderByStatusUseCase";

export class GetOrdersByStatusController {
  constructor(private readonly getOrdersByStatusUseCase: GetOrdersByStatus) {}

  async run(req: Request, res: Response) {
    try {
      const { status } = req.query;

      if (typeof status !== "string") {
        return res.status(400).send({
          status: "error",
          data: "Order status must be a string",
        });
      }

      const orders = await this.getOrdersByStatusUseCase.run(status);

      if (orders && orders.length > 0) {
        res.status(200).send({
          status: "success",
          data: orders,
        });
      } else {
        res.status(404).send({
          status: "error",
          data: "No orders found with the given status",
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ status: "error", data: "An error occurred", message: error });
    }
  }
}
