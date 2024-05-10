import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { ListClinicService } from "../../services/clinic/list-clinics";

export const listClinics = tryCatch(
  async (request: Request, response: Response) => {
    const { page } = request.query as { page: string };

    console.log("page", page);

    const listClinicsInstance = new ListClinicService();
    const listClinics = await listClinicsInstance.listClinicService(page);
    response.status(201).json(listClinics);
  }
);
