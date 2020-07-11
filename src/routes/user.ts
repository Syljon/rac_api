import express, { Router } from "express";
import * as UserController from "../controller/user";
import validate from "../helpers/validate";
import * as yup from "yup";

const router: Router = express.Router();

const getUser = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

const postUser = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  role: yup.string().required(),
});

router.get("/", UserController.getUsers);

router.get("/:id", validate(getUser), UserController.getUser);

router.post("/", validate(postUser, "body"), UserController.postUser);

router.delete("/:id", UserController.deleteUser);

export default router;
