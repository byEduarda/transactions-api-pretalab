import { PurchaseService } from "../../src/services/purchaseService";

describe("Purchases Unit Tests", () => {
  let service: PurchaseService;

  beforeEach(async () => {
    service = new PurchaseService();
    await service.create({
      date: new Date(),
      total: 7850,
      items: [
        { productId: "1", name: "Notebook Gamer Pro", price: 7500, quantity: 1 },
        { productId: "2", name: "Mouse Sem Fio Ultra-leve", price: 350, quantity: 1 },
      ],
    });
  });

  it("deve listar todas as compras", async () => {
    const all = await service.getAll();
    expect(all.length).toBeGreaterThan(0);
    expect(all[0]).toMatchObject({ total: 7850 });
  });

  it("deve buscar uma compra pelo ID", async () => {
    const all = await service.getAll();
    const purchase = await service.getById(all[0].id);
    expect(purchase).toMatchObject({ total: 7850 });
  });
});
