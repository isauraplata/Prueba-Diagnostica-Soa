import { Request, Response } from "express";
import { GetOrderById } from "../../application/getOrderUseCase";

export class GetOrderController {
  constructor(private readonly getOrderByIdUseCase: GetOrderById) {}

  async run(req: Request, res: Response) {
    try {
        const id = req.params.id;
        console.log('ID::::::', id);

        if (!id) {
          return res.status(400).send({
            status: "error",
            data: "Order ID is required",
          });
        }

        const order = await this.getOrderByIdUseCase.run(id);

        if (order) {
          res.status(200).send({
            status: "success",
            data: order,
          });
        } else {
          res.status(404).send({
            status: "error",
            data: "Order not found",
          });
        }
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "error", data: "An error occurred", message: error });
    }
  }
}
