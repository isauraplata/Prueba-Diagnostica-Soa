import { Order } from "./orderModel";

export interface OrderRepository {
    createOrder(
      products: { product_id: string; quantity: number }[], 
      totalAmount: number, 
      status: string
    ): Promise<Order | null>;
    getOrderById(id: string): Promise<Order | null>;
    getOrdersByStatus(status: string): Promise<Order[]>;
    deleteOrder(id: string): Promise<boolean>;
    updateOrderStatus(id: string, status: string): Promise<Order | null>;
  }
  