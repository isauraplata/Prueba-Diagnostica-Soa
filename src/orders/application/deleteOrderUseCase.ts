import { OrderRepository } from "../domain/orderRepository";

export class DeleteOrder {
    constructor(private orderRepository: OrderRepository) {}
  
    async run(id: string): Promise<boolean> {
        console.log('DeleteOrder use case received:', { id });
        
        const result = await this.orderRepository.deleteOrder(id);
        
        console.log('DeleteOrder use case result:', result);
        return result;
    }
}
