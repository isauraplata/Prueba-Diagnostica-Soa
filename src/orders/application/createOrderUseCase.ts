import { Order } from "../domain/orderModel";
import { OrderRepository } from "../domain/orderRepository";

export class CreateOrder {
    constructor(private orderRepository: OrderRepository) {}
  
    async run(products: { product_id: string, quantity: number }[], totalAmount: number, status: string): Promise<Order | null> {      
      const order = await this.orderRepository.createOrder(products, totalAmount, status);
      
      console.log('CreateOrder use case result:', order);
      return order;
    }
  }
  