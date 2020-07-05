import express, { Application } from "express";
import userRoutes from "./routes/user";
import mongoose from "mongoose";
import dotenv from "dotenv";

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
    app.listen(port, () => console.log("Server Up and running ", port))
  );

app.use(express.json());

app.use("/user", userRoutes);
