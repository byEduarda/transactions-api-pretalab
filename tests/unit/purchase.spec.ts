import { PurchaseService } from "../../src/services/purchaseService";
import { connect, closeDatabase, clearDatabase } from "../integration/setup";

describe("Purchases Unit Tests", () => {
  let service: PurchaseService;

  beforeAll(async () => await connect());
  afterAll(async () => await closeDatabase());
  beforeEach(async () => await clearDatabase());
  beforeEach(() => {
    service = new PurchaseService();
  });

  it("deve criar uma nova compra", async () => {
    const purchase = await service.create({ total: 7850, items: [] });
    expect(purchase).toHaveProperty("id");
    expect(purchase.total).toBe(7850);
  });

  it("deve listar todas as compras", async () => {
    await service.create({ total: 7850, items: [] });
    const purchases = await service.getAll();
    expect(purchases.length).toBeGreaterThan(0);
  });

  it("deve buscar uma compra pelo ID", async () => {
    const purchase = await service.create({ total: 7850, items: [] });
    const found = await service.getById(purchase.id);
    expect(found).toHaveProperty("id", purchase.id);
  });
});
