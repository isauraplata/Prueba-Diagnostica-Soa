import { ProductRepository } from "../domain/productRepository";

export class DeleteProduct {
    constructor(private productRepository: ProductRepository) {}

    async run(id: number): Promise<boolean> {
        const result = await this.productRepository.deleteProduct(id);
        return result;
    }
}
