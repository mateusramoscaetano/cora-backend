import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { getUserLoggedData } from "../../repositories/doctor";

export const getUserLogged = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.user;

    const getUserLogged = await getUserLoggedData(id);

    return response.status(200).json(getUserLogged);
  }
);
