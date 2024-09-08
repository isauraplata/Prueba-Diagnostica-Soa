import { CreateProduct } from "../application/createProductUseCase";
import { CreateProductController } from "./controllers/createProductController";
import { MysqlProductRepository } from "./mysqlProductRepository";
import { DeleteProduct } from "../application/deleteProductUseCase";
import { DeleteProductController } from "./controllers/deleteProductController";
import { GetAllProductsController } from "./controllers/getProductsController";
import { GetAllProducts } from "../application/getProductsUseCase";
import { UpdateProduct } from "../application/updateProductUseCase";
import { UpdateProductController } from "./controllers/updateProductController";

const productRepository =  new MysqlProductRepository();

export const createProductUseCase = new CreateProduct(productRepository);
export const createProductController = new CreateProductController(createProductUseCase);


export const deleteProductUseCase = new DeleteProduct(productRepository);
export const deleteProductController = new DeleteProductController(deleteProductUseCase);

export const getProductsUseCase = new GetAllProducts(productRepository);
export const getAllProductsController = new GetAllProductsController(getProductsUseCase);


export const updateProductUseCase = new UpdateProduct(productRepository);
export const updateProductController = new UpdateProductController(updateProductUseCase);