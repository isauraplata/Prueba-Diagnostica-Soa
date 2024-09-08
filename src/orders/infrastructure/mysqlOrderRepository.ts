import { Order } from "../domain/orderModel";
import { OrderRepository } from "../domain/orderRepository";
import { query } from "../../database/connection";

export class MysqlOrderRepository implements OrderRepository {
  async getOrderById(id: string): Promise<Order | null> {
    console.log("Imprimiendo el id desde mysqlorder: " + id);
    const sql = `
        SELECT 
            o.id AS order_id,
            o.total_amount,
            o.status AS order_status,
            p.id AS product_id,
            p.name AS product_name,
            p.price AS product_price,
            op.quantity
        FROM 
            orders o
        JOIN 
            order_products op ON o.id = op.order_id
        JOIN 
            products p ON op.product_id = p.id
        WHERE 
            o.id = ?
        ORDER BY 
            o.id;
    `;
    const params = [id];

    try {
        const [results]: any = await query(sql, params);

        if (results.length === 0) {
            return null;
        }

        const orderDetails = results.map((result: any) => ({
            product_id: result.product_id,
            product_name: result.product_name,
            product_price: result.product_price,
            quantity: result.quantity
        }));

        const order = {
            id: results[0].order_id,
            totalAmount: results[0].total_amount,
            status: results[0].order_status,
            products: orderDetails
        };

        return order;
    } catch (error) {
        console.error('Error in getOrderById:', error);
        return null;
    }
}


    async createOrder(
        products: { product_id: string; quantity: number }[],
        totalAmount: number,
        status: string
      ): Promise<Order | null> {
        console.log('MysqlOrderRepository createOrder received:', { products, totalAmount, status });
    
        if (!Array.isArray(products) || products.length === 0) {
          console.error('Invalid or empty products array');
          return null;
        }
    
        const insertOrderSQL = "INSERT INTO orders (total_amount, status) VALUES (?, ?)";
        const insertOrderProductsSQL = "INSERT INTO order_products (order_id, product_id, quantity) VALUES (?, ?, ?)";
    
        try {
          await query('START TRANSACTION', []);
          const [orderResult]: any = await query(insertOrderSQL, [totalAmount, status]);
          console.log('Order insert result:', orderResult);
    
          if (!orderResult || typeof orderResult.insertId === 'undefined') {
            throw new Error('Failed to insert order');
          }
    
          const orderId = orderResult.insertId;
          console.log('Order inserted with ID:', orderId);
    
          console.log('Inserting order products');
          for (const product of products) {
            const { product_id, quantity } = product;
            await query(insertOrderProductsSQL, [orderId, product_id, quantity]);
          }
    
          console.log('Committing transaction');
          await query('COMMIT', []);
    
          const newOrder = new Order(orderId.toString(), products.map(p => p.product_id), totalAmount, status);
          console.log('Returning new order:', newOrder);
          return newOrder;
        } catch (error) {
          console.error('Error in createOrder:', error);
          await query('ROLLBACK', []);
          return null;
        }
      }

      async getOrdersByStatus(status: string): Promise<Order[]> {
        console.log("imprimiendo status: ", status);
        const sql = `
            SELECT 
                o.id AS order_id,
                o.total_amount,
                o.status AS order_status,
                p.id AS product_id,
                p.name AS product_name,
                p.price AS product_price,
                op.quantity
            FROM 
                orders o
            JOIN 
                order_products op ON o.id = op.order_id
            JOIN 
                products p ON op.product_id = p.id
            WHERE 
                o.status = ?
            ORDER BY 
                o.id;
        `;
        const params = [status];

        try {
            const [results]: any = await query(sql, params);

            if (results.length === 0) {
                return [];
            }

            // Agrupar productos por orden
            const ordersMap = new Map();
            results.forEach((result: any) => {
                const orderId = result.order_id;

                if (!ordersMap.has(orderId)) {
                    ordersMap.set(orderId, {
                        id: orderId,
                        totalAmount: result.total_amount,
                        status: result.order_status,
                        products: []
                    });
                }

                ordersMap.get(orderId).products.push({
                    product_id: result.product_id,
                    product_name: result.product_name,
                    product_price: result.product_price,
                    quantity: result.quantity
                });
            });

            const orders = Array.from(ordersMap.values());
            return orders;
        } catch (error) {
            console.error('Error in getOrdersByStatus:', error);
            return [];
        }
    }


    async deleteOrder(id: string): Promise<boolean> {
        console.log('MysqlOrderRepository deleteOrder received:', { id });

        const deleteOrderSQL = "DELETE FROM orders WHERE id = ?";
        const deleteOrderProductsSQL = "DELETE FROM order_products WHERE order_id = ?";

        try {
            console.log('Starting transaction');
            await query('START TRANSACTION', []);

            console.log('Deleting order products');
            await query(deleteOrderProductsSQL, [id]);

            console.log('Deleting order');
            const [result]: any = await query(deleteOrderSQL, [id]);

            if (result.affectedRows === 0) {
                console.error('No rows affected, order might not exist');
                throw new Error('Order not found or already deleted');
            }

            console.log('Committing transaction');
            await query('COMMIT', []);

            console.log('Order successfully deleted');
            return true;
        } catch (error) {
            console.error('Error in deleteOrder:', error);
            await query('ROLLBACK', []);
            return false;
        }
    }

}
