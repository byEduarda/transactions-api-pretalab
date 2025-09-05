import express from "express";
import cors from "cors";
import { connectDB } from "./database/mongoConnect";

import productsRoutes from "./routes/productsRoutes";
import transactionsRoutes from "./routes/transactionsRoutes";
import purchasesRoutes from "./routes/purchasesRoutes";
import checkoutRoutes from "./routes/checkoutRoutes";
import syncRoutes from "./routes/syncRoutes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

connectDB();

app.use("/purchases", purchasesRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/products", productsRoutes);
app.use("/transactions", transactionsRoutes);
app.use("/sync-products", syncRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'Transactions API v2.1' });
});

export default app;
