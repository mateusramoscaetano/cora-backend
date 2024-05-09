import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';

export const validateZod = (schema: ZodSchema) => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      schema.parse(request.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => issue.message);
        response
          .status(400)
          .json({ type: 'BadRequestError', messages: errorMessages });
      } else {
        next(error);
      }
    }
  };
};
