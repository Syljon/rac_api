import express, { Router } from "express";
import * as testController from "../controller/test";

const router: Router = express.Router();

router.get("/", testController.test);

export default router;
