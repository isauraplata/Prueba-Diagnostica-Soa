import { ProductRepository } from "../domain/productRepository";

export class GetBestSellerUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async run(): Promise<{ product_name: string, description: string, total_sold: number } | null> {
    try {
      const bestSeller = await this.productRepository.getMostSoldProduct();
      return bestSeller;
    } catch (error) {
      console.error("Error in GetBestSellerUseCase:", error);
      return null;
    }
  }
}