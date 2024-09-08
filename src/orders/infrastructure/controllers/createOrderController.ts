import { Request, Response } from "express";
import { CreateOrder } from "../../application/createOrderUseCase";

export class CreateOrderController {
  constructor(private readonly createOrderUseCase: CreateOrder) {}

  async run(req: Request, res: Response) {
    try {
        const { products, totalAmount, status } = req.body;

        if (!Array.isArray(products) || products.length === 0) {
          console.log('Invalid products array:', products);
          return res.status(400).send({
            status: "error",
            data: "Invalid or empty products array",
          });
        }
        const order = await this.createOrderUseCase.run(products, totalAmount, status);
      if (order) {
        res.status(201).send({
          status: "success",
          data: {
            id: order.id,
            products: order.products,
            totalAmount: order.totalAmount,
            status: order.status,
          },
        });
      } else {
        res.status(400).send({
          status: "error",
          data: "No fue posible crear el pedido",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "error", data: "Ocurrió un error", message: error });
    }
  }
}
