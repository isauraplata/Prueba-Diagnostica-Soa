import { OrderRepository } from "../domain/orderRepository";
import { Order } from "../domain/orderModel";

export class UpdateOrderStatusUseCase {
    constructor(private orderRepository: OrderRepository) {}
  
    async execute(orderId: string, status: string): Promise<Order | null> {
      return await this.orderRepository.updateOrderStatus(orderId, status);
    }
}
  