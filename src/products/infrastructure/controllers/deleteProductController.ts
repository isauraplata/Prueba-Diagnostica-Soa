import { Request, Response } from "express";
import { DeleteProduct } from "../../application/deleteProductUseCase";

export class DeleteProductController {
    constructor(private readonly deleteProductUseCase: DeleteProduct) {}

    async run(req: Request, res: Response) {
        try {
            const { id } = req.params;
            console.log('Received request params:', req.params);

            const productId = parseInt(id, 10);

            if (isNaN(productId)) {
                console.log('Invalid product ID:', id);
                return res.status(400).send({
                    status: "error",
                    data: "Invalid or missing product ID",
                });
            }
            const result = await this.deleteProductUseCase.run(productId);
            if (result) {
                res.status(200).send({
                    status: "success",
                    data: "Product successfully deleted",
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
