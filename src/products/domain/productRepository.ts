import { Product } from "./productModel";

export interface ProductRepository {
  createProduct(
    name: string,
    description: string,
    price: number,
    stock_quantity: number,
  ): Promise<Product | null>;

}