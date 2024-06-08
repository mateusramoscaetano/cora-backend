import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { findDoctorById } from "../../repositories/doctor";

export const getDoctorDetail = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };

    const getDoctorDetail = await findDoctorById(id);
    response.status(201).json(getDoctorDetail);
  }
);
