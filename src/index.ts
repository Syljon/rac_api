import express, { Application } from "express";
import testRoutes from "./routes/test";

const port: number = Number(process.env.PORT) || 5000;
const app: Application = express();

app.use("/test", testRoutes);
app.listen(port, () => console.log("Server Up and running ", port));
