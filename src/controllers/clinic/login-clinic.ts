import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { LoginClinicService } from "../../services/clinic/login-clinic";

export const loginClinic = tryCatch(
  async (request: Request, response: Response) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const loginClinicInstance = new LoginClinicService();

    const loginClinic = await loginClinicInstance.loginClinic(email, password);
    response.status(200).json(loginClinic);
  }
);
