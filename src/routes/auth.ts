import express, { Router } from "express";
import * as AuthController from "../controller/auth";
import validate from "../helpers/validate";
import * as yup from "yup";

const Login = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

const SetPassword = yup.object({
  token: yup.string().required(),
  password: yup.string().required(),
  password2: yup
    .string()
    .required()
    .test("password-match", "Password don't match", function (value) {
      const { password } = this.parent;
      return password === value;
    }),
});

const router: Router = express.Router();

router.post("/login", validate(Login, "body"), AuthController.login);

router.post(
  "/set-password",
  validate(SetPassword, "body"),
  AuthController.setPassword
);

export default router;
