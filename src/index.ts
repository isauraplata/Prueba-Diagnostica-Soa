import express from "express"
import * as dotenv from "dotenv"
import productRouter from "./products/infrastructure/ProductRouter";
// import cors from "cors";

const app =express();
dotenv.config();
app.use(express.json());
// app.use(cors());

const port=process.env.PORT_SERVER;
const now = new Date();


app.listen(port,()=>{
    console.log("listening on port: "+port)
    console.log(now.toLocaleString());
});



app.use("/api/v1/products",productRouter);