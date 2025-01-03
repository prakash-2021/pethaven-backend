import bodyParser from "body-parser";
import express from "express";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

export default app;
