import { Product } from "../domain/Products";

export class ProductRepository {
  private products: Product[] = [
    { id: "1", name: "Notebook Gamer Pro", price: 7500 },
    { id: "2", name: "Mouse Sem Fio Ultra-leve", price: 350 },
    { id: "3", name: "Teclado Mecânico RGB", price: 550 },
    { id: "4", name: 'Monitor 4K 27"', price: 2500 },
    { id: "5", name: "Headset 7.1 Surround", price: 600 },
    { id: "6", name: "Webcam Full HD", price: 400 },
    { id: "7", name: "SSD NVMe 1TB", price: 800 },
  ];

  public async getProducts(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }

  public async getProductById(id: string): Promise<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return Promise.resolve(product);
  }
}
