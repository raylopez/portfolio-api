import { type NextFunction, type Request, type Response } from "express";

export const errorMiddleware = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  
  if (err.name == 'SequelizeDatabaseError') {
    console.error('Database error', err.message);
  } else{
    console.error('Error', err);
  }

  res.status(500).json({ message: 'internal error' })
  next()
}