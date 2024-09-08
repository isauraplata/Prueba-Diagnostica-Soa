import { Request, Response } from "express";
import { DeleteOrder } from "../../application/deleteOrderUseCase";

export class DeleteOrderController {
    constructor(private readonly deleteOrderUseCase: DeleteOrder) {}

    async run(req: Request, res: Response) {
        try {
            const { id } = req.params;
            console.log('Received request params:', req.params);
        
            if (!id) {
                console.log('Invalid order ID:', id);
                return res.status(400).send({
                    status: "error",
                    data: "Invalid or missing order ID",
                });
            }
        
            console.log('Calling deleteOrderUseCase with:', { id });
            const result = await this.deleteOrderUseCase.run(id);
            if (result) {
                res.status(200).send({
                    status: "success",
                    data: "Order successfully deleted",
                });
            } else {
                res.status(404).send({
                    status: "error",
                    data: "Order not found",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "error", data: "Ocurrió un error", message: error });
        }
    }
}
