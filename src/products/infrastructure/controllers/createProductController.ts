import { Request, Response } from "express";
import { CreateProduct } from "../../application/createProductUseCase";
import { createProductValidation } from "../utils/validationSchema";

export class CreateProductController {
  constructor(private readonly createProductUseCase: CreateProduct) {}

  async run(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log(data);

      const { error } = createProductValidation(req.body);
      if (error)
        return res
          .status(400)
          .json({ error: error, message: error.details[0].message });

      const product = await this.createProductUseCase.run(
        data.name,
        data.description,
        data.price,
        data.stock_quantity
      );

      if (product) {
        res.status(201).send({
          status: "success",
          data: {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock_quantity: product.stock_quantity,
          },
        });
      } else {
        res
          .status(204)
          .send({
            status: "error",
            data: "No fue posible agregar el registro",
          });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ status: "error", data: "Ocurrió un error", message: error });
    }
  }
}
