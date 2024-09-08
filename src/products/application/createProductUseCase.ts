import { Product } from "../domain/productModel";
import { ProductRepository } from "../domain/productRepository";

export class CreateProduct{
  constructor(readonly productRepository: ProductRepository) {}

  async run(
    name: string,
    description: string,
    price: number,
    stock_quantity: number,
  ): Promise<Product | null> {
    try {
      const product= await this.productRepository.createProduct(name, description, price, stock_quantity);
      return product;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}