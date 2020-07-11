import User, { IUser } from "../model/user";
import bcrypt from "bcryptjs";
import { createToken } from "../helpers/token";

type RequestBody = {
  email: string;
  password: string;
};

export async function login(req: any, res: any) {
  const body = req.body as RequestBody;
  const user: IUser | null = await User.findOne({ email: body.email });
  if (!user) {
    return res.status(400).send({ message: "User with that email exists" });
  }
  const validPass = await bcrypt.compare(body.password, user.hashPassword);
  if (!validPass) {
    return res.status(400).send({ message: "Invalid password" });
  }
  const token = createToken(user);
  return res.header("auth-token", token).send(token);
}
