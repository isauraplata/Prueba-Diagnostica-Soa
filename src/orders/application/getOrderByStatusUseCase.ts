import { OrderRepository } from "../domain/orderRepository";
import { Order } from "../domain/orderModel";

export class GetOrdersByStatus {
    constructor(private orderRepository: OrderRepository) {}

    async run(status: string): Promise<Order[]> {
        const orders = await this.orderRepository.getOrdersByStatus(status);
        return orders;
    }
}
