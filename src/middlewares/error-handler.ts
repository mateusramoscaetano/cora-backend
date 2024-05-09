import { type Request, type NextFunction, type Response } from 'express';

type CustomError = {
  name: string;
  message: string;
};

export const errorHandler = (
  error: CustomError,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (error.name === 'NotFoundError') {
    return response
      .status(404)
      .json({ message: error.message, type: error.name });
  }

  if (error.name === 'BadRequestError') {
    return response.status(400).json({
      message: error.message,
      type: error.name,
    });
  }

  if (error.name === 'UnauthorizedError') {
    return response
      .status(401)
      .json({ message: error.message, type: error.name });
  }

  return response.status(500).json({ message: 'Error', error: error.message });
};
