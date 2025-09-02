import { TransactionService } from "../../src/services/transactionService";

describe("Transactions Unit Tests", () => {
  let service: TransactionService;

  beforeEach(async () => {
    service = new TransactionService();
    await service.create({
      date: new Date(),
      description: "Salário de Julho",
      amount: 5000,
      type: "income",
      category: "Salário",
    });
  });

  it("deve listar todas as transações", async () => {
    const all = await service.getAll();
    expect(all.length).toBeGreaterThan(0);
    expect(all[0]).toMatchObject({
      description: "Salário de Julho",
      amount: 5000,
      type: "income",
      category: "Salário",
    });
  });

  it("deve buscar uma transação pelo ID", async () => {
    const all = await service.getAll();
    const tx = await service.getById(all[0].id);
    expect(tx).toMatchObject({
      description: "Salário de Julho",
      amount: 5000,
    });
  });
});
