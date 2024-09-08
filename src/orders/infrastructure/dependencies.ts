import { CreateOrder } from "../application/createOrderUseCase";
import { CreateOrderController } from "./controllers/createOrderController";
import { GetOrderById } from "../application/getOrdersUseCase";
import { GetOrderController } from "./controllers/getOrderController";
import { MysqlOrderRepository } from "./mysqlOrderRepository";
import { GetOrdersByStatus } from "../application/getOrderByStatusUseCase";
import { GetOrdersByStatusController } from "./controllers/getOrderByStatusController";
import { DeleteOrder } from "../application/deleteOrderUseCase";
import { DeleteOrderController } from "./controllers/deleteOrderController";


const orderRepository = new MysqlOrderRepository();

export const createOrderUseCase = new CreateOrder(orderRepository);
export const createOrderController = new CreateOrderController(createOrderUseCase)

export const getOrderUseCase = new GetOrderById(orderRepository);
export const getOrderController = new GetOrderController(getOrderUseCase)

export const getOrdersByStatusUseCase = new GetOrdersByStatus(orderRepository);
export const getOrdersByStatusController = new GetOrdersByStatusController(getOrdersByStatusUseCase)

export const deleteOrderUseCase = new DeleteOrder(orderRepository);
export const deleteOrderController = new DeleteOrderController(deleteOrderUseCase)