import { Request, Response } from "express";
import { UpdateOrderStatusUseCase } from "../../application/updateOrderStatusUseCase";

export class UpdateOrderStatusController {
  constructor(private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase) {}

  async run(req: Request, res: Response) {
    try {

        const { id } = req.params;
      const { status } = req.body;

      // Validar que el ID del pedido esté presente
      if (!id) {
        return res.status(400).send({
          status: "error",
          data: "Order ID is required",
        });
      }

      // Validar que el estado esté presente
      if (!status) {
        return res.status(400).send({
          status: "error",
          data: "Order status is required",
        });
      }

      // Actualizar el estado del pedido
      const updatedOrder = await this.updateOrderStatusUseCase.execute(id, status);

      // Comprobar si se actualizó correctamente
      if (updatedOrder) {
        res.status(200).send({
          status: "success",
          data: {
            id: updatedOrder.id,
            products: updatedOrder.products,
            totalAmount: updatedOrder.totalAmount,
            status: updatedOrder.status,
          },
        });
      } else {
        res.status(404).send({
          status: "error",
          data: "Order not found or status not updated",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "error",
        data: "An error occurred",
        message: error,
      });
    }
  }
}
