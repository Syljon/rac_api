import express, { Router } from "express";
import * as AuthController from "../controller/auth";
import validate from "../helpers/validate";
import * as yup from "yup";

const login = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

const router: Router = express.Router();

router.post("/login", validate(login, "body"), AuthController.login);

export default router;
