import { TransactionRepository } from "../../src/repositories/transactionRepository";
import * as transactionService from "../../src/services/transactionService";

describe("Transaction Service - Unit Tests", () => {
  const mockTransactions = [
    {
      id: "1",
      date: "2024-07-15T10:00:00Z",
      description: "Salário de Julho",
      amount: 5000,
      type: "income" as const,
      category: "Salário",
    },
    {
      id: "2",
      date: "2024-07-15T12:30:00Z",
      description: "Aluguel",
      amount: 1500,
      type: "expense" as const,
      category: "Moradia",
    },
  ];

  let repo: TransactionRepository;

  beforeEach(() => {
    repo = new TransactionRepository();
    (repo as any).transactions = [...mockTransactions];
  });

  it("deve retornar todas as transações", () => {
  const result = repo.getAll();
  expect(result.length).toBe(mockTransactions.length);
  const sortedMock = [...mockTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  expect(result[0]).toMatchObject(sortedMock[0]);
  expect(result[result.length - 1]).toMatchObject(sortedMock[sortedMock.length - 1]);
});

  it("deve retornar uma transação pelo ID", () => {
    const result = repo.getById("2");
    expect(result).toMatchObject(mockTransactions[1]);
  });

  it("deve criar uma nova transação com ID sequencial", () => {
    const newTransaction = {
      description: "Venda Teste",
      amount: 1000,
      type: "income" as const,
      category: "Renda Extra",
      date: new Date().toISOString(),
    };

    const created = repo.create(newTransaction);
    expect(created.id).toBe("3"); 
    expect(created).toMatchObject(newTransaction);

    expect(repo.getAll().length).toBe(3);
  });
});
