import { query } from "../../database/mysql";
import { Product } from "../domain/productModel";
import { ProductRepository } from "../domain/productRepository";


export class MysqlProductRepository implements ProductRepository {
  async updateProduct(
    id: string,
    name: string,
    description: string,
    price: number,
    stock_quantity: number,
    image: string
  ): Promise<Product | null> {
    const sql = `
      UPDATE products
      SET name = ?, description = ?, price = ?, stock_quantity = ?, image = ?
      WHERE id = ?
    `;
    const params: any[] = [name, description, price, stock_quantity, image, id];
    try {
      const [result]: any = await query(sql, params);
      return result.affectedRows;
    } catch (error) {
      return null;
    }
  }

  async deleteProduct(id: string): Promise<Product | null> {
    const sql = "DELETE FROM products WHERE id = ?";
    const params: any[] = [id];
    try {
      const [result]: any = await query(sql, params);
      console.log("impriminedo elresult " + result);
      return result;
    } catch (error) {
      throw new Error(`Error deleting product: ${error}`);
    }
  }

  async getProduct(id: string): Promise<Product | null> {
    const sql = "SELECT * FROM products WHERE id = ?";
    const params: any[] = [id];
    try {
      const [result]: any = await query(sql, params);
      if (result.length > 0) {
        const product = result[0];
        return new Product(
          product.id,
          product.name,
          product.description,
          product.price,
          product.stock_quantity,
        );
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Error obtaining product: ${error}`);
    }
  }

  async createProduct(
    name: string,
    description: string,
    price: number,
    stock_quantity: number,
  ): Promise<Product | null> {
    const sql =
      "INSERT INTO products (name, description, price, stock_quantity) VALUES (?, ?, ?, ?)";
    const params: any[] = [name, description, price, stock_quantity];
    try {
      const [result]: any = await query(sql, params);
      return new Product(
        result.insertId,
        name,
        description,
        price,
        stock_quantity
      );
    } catch (error) {
      return null;
    }
  }
}