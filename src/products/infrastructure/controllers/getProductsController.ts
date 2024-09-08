import { Request, Response } from "express";
import { GetAllProducts } from "../../application/getProductsUseCase";

export class GetAllProductsController {
    constructor(private readonly getAllProductsUseCase: GetAllProducts) {}

    async run(req: Request, res: Response) {
        try {
            const products = await this.getAllProductsUseCase.run();
            
            if (products.length > 0) {
                res.status(200).send({
                    status: "success",
                    data: products,
                });
            } else {
                res.status(404).send({
                    status: "error",
                    data: "No products found",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "error", data: "Ocurrió un error", message: error });
        }
    }
}
