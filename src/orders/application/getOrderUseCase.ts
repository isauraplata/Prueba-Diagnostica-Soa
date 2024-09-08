import { OrderRepository } from "../domain/orderRepository";
import { Order } from "../domain/orderModel";

export class GetOrderById {
    constructor(private orderRepository: OrderRepository) {}

    async run(id: string): Promise<Order | null> {


        const order = await this.orderRepository.getOrderById(id);

        return order;
    }
}
