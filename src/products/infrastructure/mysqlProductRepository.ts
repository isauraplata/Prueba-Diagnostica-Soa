import { query } from "../../database/connection";
import { Product } from "../domain/productModel";
import { ProductRepository } from "../domain/productRepository";

export class MysqlProductRepository implements ProductRepository {
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
          product.stock_quantity
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
    stock_quantity: number
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

  async getAllProducts(): Promise<Product[]> {
    const sql =
      "SELECT id, name, description, price, stock_quantity FROM products";

    try {
      const [results]: any = await query(sql, []);

      if (results.length === 0) {
        console.log("No products found");
        return [];
      }

      const products = results.map(
        (result: any) =>
          new Product(
            result.id,
            result.name,
            result.description,
            result.price,
            result.stock_quantity
          )
      );

      console.log("Products retrieved:", products);
      return products;
    } catch (error) {
      console.error("Error in getAllProducts:", error);
      return [];
    }
  }

  async updateProduct(
    id: number,
    name: string,
    description: string,
    price: number,
    stock_quantity: number
  ): Promise<Product | null> {
    console.log("MysqlProductRepository updateProduct received:", {
      id,
      name,
      description,
      price,
      stock_quantity,
    });

    const updateProductSQL = `
      UPDATE products 
      SET name = ?, description = ?, price = ?, stock_quantity = ?
      WHERE id = ?
  `;

    try {
      console.log("Updating product");
      const [result]: any = await query(updateProductSQL, [
        name,
        description,
        price,
        stock_quantity,
        id,
      ]);

      if (result.affectedRows === 0) {
        console.error("No rows affected, product might not exist");
        return null;
      }

      // Recuperar el producto actualizado
      const updatedProduct = new Product(
        id,
        name,
        description,
        price,
        stock_quantity
      );
      console.log("Product successfully updated:", updatedProduct);
      return updatedProduct;
    } catch (error) {
      console.error("Error in updateProduct:", error);
      return null;
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    const deleteProductSQL = "DELETE FROM products WHERE id = ?";

    try {
      await query("START TRANSACTION", []);
      const [result]: any = await query(deleteProductSQL, [id]);

      if (result.affectedRows === 0) {
        console.error("No rows affected, product might not exist");
        throw new Error("Product not found or already deleted");
      }

      await query("COMMIT", []);
      return true;
    } catch (error) {
      console.error("Error in deleteProduct:", error);
      await query("ROLLBACK", []);
      return false;
    }
  }
}
