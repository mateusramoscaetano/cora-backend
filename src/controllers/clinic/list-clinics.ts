import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { ListClinicService } from "../../services/clinic/list-clinics";

export const listClinics = tryCatch(
  async (request: Request, response: Response) => {
    const { page, name } = request.query as { page: string; name?: string };

    const listClinicsInstance = new ListClinicService();
    const listClinics = await listClinicsInstance.listClinicService(page, name);
    response.status(201).json(listClinics);
  }
);
