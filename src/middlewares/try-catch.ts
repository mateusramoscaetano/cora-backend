/* eslint-disable indent */
import { type Request, type Response, type NextFunction } from 'express';

type ControllerFunction = (
  request: Request,
  response: Response,
) => Promise<Response | void>;

const tryCatch =
  (controller: ControllerFunction) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await controller(request, response);
    } catch (error) {
      next(error);
    }
  };

export default tryCatch;
