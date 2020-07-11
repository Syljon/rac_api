import * as yup from "yup";

export default (
  schema: yup.ObjectSchema<object | undefined>,
  path: "query" | "body" = "query"
) => async (req: any, res: any, next: any) => {
  try {
    await schema.validate(req[path]);
    return next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};
