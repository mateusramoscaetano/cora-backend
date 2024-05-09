import dotenv from "dotenv";
import { type Request, type Response, type NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { findDoctorById } from "../repositories/doctor";

dotenv.config();

export const authLogin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();
    const { id } = verify(token, `${process.env.JWT_PASS}`) as { id: string };

    const userExist = await findDoctorById(id);

    if (!userExist) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    if (userExist.role !== "adm") {
      return response.status(401).json({ message: "Unauthorized" });
    }

    const { password: _, ...user } = userExist;
    request.user = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).json({ error: error.message });
    }
  }
};
