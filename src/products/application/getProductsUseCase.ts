import { ProductRepository } from "../domain/productRepository";
import { Product } from "../domain/productModel";

export class GetAllProducts {
    constructor(private productRepository: ProductRepository) {}

    async run(): Promise<Product[]> {
        const products = await this.productRepository.getAllProducts();
        return products;
    }
}
