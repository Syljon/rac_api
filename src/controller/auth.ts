import User, { IUser } from "../model/user";
import bcrypt from "bcryptjs";
import { decodeToken } from "../helpers/token";
import { loginService } from "../services/auth.service";

type SETPAsswordBody = {
  token: string;
  password: string;
  password2: string;
};

export async function login(req: any, res: any) {
  const body = req.body as LoginRequestBody;
  const { status, data } = await loginService(body);
  return res.status(status).send(data);
}

export async function setPassword(req: any, res: any) {
  const body = req.body as SETPAsswordBody;
  const { email } = decodeToken(body.token);

  const existingUser = await User.findOne({ email: email });

  if (!existingUser)
    return res.status(400).send("User with that email dosne't exists");

  existingUser.hashPassword = await bcrypt.hash(
    body.password,
    await bcrypt.genSalt(10)
  );
  existingUser.emailConfirmed = true;

  try {
    const savedUser = await existingUser.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
}
