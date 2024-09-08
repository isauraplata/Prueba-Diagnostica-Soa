export class Order {
    constructor(
      public id: string,
      public products: string[], 
      public totalAmount: number,
      public status: string 
    ) {}
  
  }