import { ProductService } from "../../src/services/productsService";

describe("Products Unit Tests", () => {
  let service: ProductService;

  beforeEach(() => {
    service = new ProductService();
  });

  it("deve listar todos os produtos", async () => {
    const all = await service.getAll();
    expect(all.length).toBeGreaterThan(0);
    expect(all[0]).toMatchObject({
      id: "1",
      name: "Notebook Gamer Pro",
      price: 7500,
    });
  });

  it("deve buscar um produto pelo ID", async () => {
    const product = await service.getById("1");
    expect(product).toMatchObject({
      id: "1",
      name: "Notebook Gamer Pro",
      price: 7500,
    });
  });
});
