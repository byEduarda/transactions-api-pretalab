import { Product } from "../models/Products";
import { ProductRepository } from "../repositories/productRepository";

export class ProductService {
  constructor(private repo = new ProductRepository()) {}

  public async getAll(): Promise<Product[]> {
    return this.repo.getProducts();
  }

  public async getById(id: string): Promise<Product | undefined> {
    return this.repo.getProductById(id);
  }
}
