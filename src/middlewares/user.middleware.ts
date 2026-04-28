import type { Request, Response, NextFunction } from "express";
import { validateUserSchema } from "../models/schema.ts";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validation = validateUserSchema(req.body);
  if (validation.success) {
    req.body = validation.data;
    return next();
  }

  if (validation.error)
    return res
      .status(400)
      .send({
        message: "error de entrada",
        error: JSON.parse(validation.error.message),
      });
};


export const userUpdateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validation = validateUserSchema(req.body, true);
  if (validation.success) {
    req.body = validation.data;
    return next();
  }

  if (validation.error)
    return res
      .status(400)
      .send({
        message: "error de entrada",
        error: JSON.parse(validation.error.message),
      });
};