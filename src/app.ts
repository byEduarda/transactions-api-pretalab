import express from "express";
import cors from "cors";

import productsRoutes from "./routes/productsRoutes";
import transactionsRoutes from "./routes/transactionsRoutes";
import purchasesRoutes from "./routes/purchasesRoutes";
import checkoutRoutes from "./routes/checkoutRoutes";
import syncRoutes from "./routes/syncRoutes";
import aiRoutes from "./routes/aiRoutes";

import { chat } from './controllers/aiController';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/purchases", purchasesRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/products", productsRoutes);
app.use("/transactions", transactionsRoutes);
app.use("/sync-products", syncRoutes);
app.use('/chat', aiRoutes);

app.post('/chat', chat);

app.get('/', (_req, res) => {
  res.json({ message: 'Transactions API v2.1' });
});

export default app;
