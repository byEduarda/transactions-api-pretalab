import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import { TransactionService } from "./services/transactionService";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI não definido!");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB conectado com sucesso!");

    await TransactionService.seedInitialTransactions();
    console.log("Transações mockadas inseridas (se necessário)");

    app.listen(PORT, () => {
      console.log(`🛍️ Server rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Erro ao conectar no MongoDB:", err);
    process.exit(1);
  });
