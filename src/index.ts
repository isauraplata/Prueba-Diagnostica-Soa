import express from "express"
import * as dotenv from "dotenv"
import productRouter from "./products/infrastructure/productRouter";
import orderRouter from "./orders/infrastructure/orderRouter";
import cors from "cors";

const app =express();

dotenv.config();
app.use(express.json());
app.use(cors());

const port=process.env.PORT_SERVER;
const now = new Date();


app.listen(port,()=>{
    console.log("listening on port: "+port)
    console.log(now.toLocaleString());
});

app.use("/api/v1/products",productRouter);
app.use("/api/v1/orders",orderRouter);

// He mantenido la configuración de CORS asi para permitir solicitudes de cualquier origen. No obstante, sé que es crucial restringir el acceso especificando las URLs y métodos permitidos para mayor seguridad