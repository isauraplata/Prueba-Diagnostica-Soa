import { Request, Response } from "express";
import { GetBestSellerUseCase } from "../../application/getBestSellerUseCase";

export class GetBestSellerController {
  constructor(private readonly getBestSellerUseCase: GetBestSellerUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const product = await this.getBestSellerUseCase.run();
      if (!product) {
        return res.status(404).send({
          status: "error",
          data: "No se encontraron productos vendidos.",
        });
      }
      return res.status(200).send({
        status: "success",
        data: {
          name: product.product_name,
          description: product.description,
          totalSold: product.total_sold,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: "error",
        data: "Ocurrió un error al obtener el producto más vendido.",
        message: error,
      });
    }
  }
}