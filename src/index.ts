import express, { Application } from "express";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const port: number = Number(process.env.PORT) || 5000;
const app: Application = express();

dotenv.config();

mongoose
  .connect(
    process.env.DB_CONNECT as string,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async () => {
      console.log("connected to db!");
    }
  )
  .finally(async () =>
    app.listen(port, () => {
      console.log("Server Up and running ", port);
      console.log(process.env.NODE_ENV);
    })
  );

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
