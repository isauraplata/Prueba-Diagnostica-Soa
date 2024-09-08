import { CreateProduct } from "../application/createProductUseCase";
import { CreateProductController } from "./controllers/createProductController";
import { MysqlProductRepository } from "./mysqlProductRepository";

const productRepository =  new MysqlProductRepository();

export const createProductUseCase = new CreateProduct(productRepository);
export const createProductController = new CreateProductController(createProductUseCase);

