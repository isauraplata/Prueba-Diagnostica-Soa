import { ProductRepository } from "../domain/productRepository";
import { Product } from "../domain/productModel";

export class UpdateProduct {
    constructor(private productRepository: ProductRepository) {}

    async run(
        id: number,
        name: string,
        description: string,
        price: number,
        stock_quantity: number
    ): Promise<Product | null> {

        const product = await this.productRepository.updateProduct(id, name, description, price, stock_quantity);
    
        return product;
    }
}
