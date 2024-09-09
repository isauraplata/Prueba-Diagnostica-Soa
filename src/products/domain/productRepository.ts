import { Product } from "./productModel";

export interface ProductRepository {
  createProduct(
    name: string,
    description: string,
    price: number,
    stock_quantity: number
  ): Promise<Product | null>;
  deleteProduct(id: number): Promise<boolean>;
  getAllProducts(): Promise<Product[]>;
  updateProduct(
    id: number,
    name: string,
    description: string,
    price: number,
    stock_quantity: number
  ): Promise<Product | null>;
  getMostSoldProduct(): Promise<{
    product_name: string;
    description: string;
    total_sold: number;
  } | null>;
}
