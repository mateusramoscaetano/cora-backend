import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { LoginDoctorService } from "../../services/doctor/login-doctor";

export const loginDoctor = tryCatch(
  async (request: Request, response: Response) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const loginDoctorInstance = new LoginDoctorService();
    const doctor = await loginDoctorInstance.loginDoctor(email, password);

    response.status(200).json(doctor);
  }
);
