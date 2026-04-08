import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import favRoutes from "./routes/favourites.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/favourites", favRoutes);

export default app;