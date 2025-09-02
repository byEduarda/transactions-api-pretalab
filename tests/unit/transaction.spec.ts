import { TransactionService } from "../../src/services/transactionService";
import { TransactionRepository } from "../../src/repositories/transactionRepository";
import { Transaction } from "../../src/domain/Transaction";

jest.mock("../../src/repositories/transactionRepository");

describe("TransactionService", () => {
  let service: TransactionService;
  let repoMock: jest.Mocked<TransactionRepository>;

  beforeEach(() => {
    repoMock = new TransactionRepository() as jest.Mocked<TransactionRepository>;
    service = new TransactionService(repoMock);
  });

  it("should create a transaction", async () => {
    const transaction: Transaction = {
      date: new Date(),
      description: "Teste",
      amount: 100,
      type: "income",
      category: "Salário"
    };

    repoMock.create.mockResolvedValue(transaction as any);

    const result = await service.create(transaction);
    expect(repoMock.create).toHaveBeenCalledWith(transaction);
    expect(result).toEqual(transaction);
  });

  it("should list transactions", async () => {
    const transactions = [{ description: "Teste" }] as any;
    repoMock.findAll.mockResolvedValue(transactions);

    const result = await service.list();
    expect(result).toEqual(transactions);
  });
});
