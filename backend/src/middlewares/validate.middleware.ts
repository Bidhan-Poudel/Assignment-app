import { Request, Response, NextFunction } from 'express';
import { ZodAny, ZodError } from 'zod';

export const validateRoute = (schema: ZodAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Validation Error',
          details: error.issues
        });
      }
      next(error);
    }
  };
};
