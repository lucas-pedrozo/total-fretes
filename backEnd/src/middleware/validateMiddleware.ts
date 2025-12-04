// src/middleware/validate.ts
import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateBody =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.issues });
    }
    req.body = result.data;
    return next();
  };