import express, { Router } from "express";
import * as UserController from "../controller/user";

const router: Router = express.Router();

router.get("/", UserController.getUsers);

router.get("/:id", UserController.getUser);

router.post("/", UserController.postUser);

router.delete("/:id", UserController.deleteUser);

export default router;
