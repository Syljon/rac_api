import { Response, Request, NextFunction } from "express";

export const test = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ message: "Test route work" });
};
