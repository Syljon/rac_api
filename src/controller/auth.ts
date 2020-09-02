import { LoginRequestBody, SetPasswordBody } from "../model/DTO/auth";
import { loginService, setPasswordService } from "../services/auth.service";

export async function login(req: any, res: any) {
  const body = req.body as LoginRequestBody;
  const { status, data } = await loginService(body);
  return res.status(status).send(data);
}

export async function setPassword(req: any, res: any) {
  const body = req.body as SetPasswordBody;
  const { status, data } = await setPasswordService(body);
  return res.status(status).send(data);
}
