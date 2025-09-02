import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./database/mongoConnect";

import productsRoutes from "./routes/productsRoutes";
import transactionsRoutes from "./routes/transactionsRoutes";
import purchasesRoutes from "./routes/purchasesRoutes";

const app = express();

app.use(bodyParser.json());
app.use("/api/products", productsRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/purchases", purchasesRoutes);

connectDB();

export default app;
