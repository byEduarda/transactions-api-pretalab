import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./database/mongoConnect";

import productsRoutes from "./routes/productsRoutes";
import transactionsRoutes from "./routes/transactionsRoutes";
import purchasesRoutes from "./routes/purchasesRoutes";
import syncRoutes from "./routes/syncRoutes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/purchases", purchasesRoutes);
app.use("/products", productsRoutes);
app.use("/transactions", transactionsRoutes);
app.use("/sync-products", syncRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'Transactions API v2.1' });
});

connectDB();

export default app;
