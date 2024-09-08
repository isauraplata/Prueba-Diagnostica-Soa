import { Request, Response } from "express";
import { UpdateProduct } from "../../application/updateProductUseCase";

export class UpdateProductController {
    constructor(private readonly updateProductUseCase: UpdateProduct) {}

    async run(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, description, price, stock_quantity } = req.body;
            const productId = parseInt(id, 10);

            if (isNaN(productId)) {
                console.log('Invalid product ID:', id);
                return res.status(400).send({
                    status: "error",
                    data: "Invalid or missing product ID",
                });
            }

            if (!name || !description || typeof price !== 'number' || typeof stock_quantity !== 'number') {
                console.log('Invalid product data:', { name, description, price, stock_quantity });
                return res.status(400).send({
                    status: "error",
                    data: "Invalid product data",
                });
            }

            const product = await this.updateProductUseCase.run(productId, name, description, price, stock_quantity);
            if (product) {
                res.status(200).send({
                    status: "success",
                    data: product,
                });
            } else {
                res.status(404).send({
                    status: "error",
                    data: "Product not found",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "error", data: "Ocurrió un error", message: error });
        }
    }
}
