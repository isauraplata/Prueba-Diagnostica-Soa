import Joi from "joi";

//validaciones 

export const createProductValidation=(body:object)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required().label("Name"), 
        description: Joi.string().max(500).optional().label("Description"), 
        price: Joi.number().positive().precision(2).required().label("Price"), // Precio positivo con 2 decimales
        stock_quantity: Joi.number().integer().min(0).required().label("Stock Quantity") // Cantidad en stock, entero, no negativo
      });
    return schema.validate(body)
}

