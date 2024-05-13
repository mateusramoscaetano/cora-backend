import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { LoginPetOwnerService } from "../../services/pet-owner/login-pet-owner";

export const loginPetOwner = tryCatch(
  async (request: Request, response: Response) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };
    const loginPetOwnerInstance = new LoginPetOwnerService();

    const loginPetOwner = await loginPetOwnerInstance.loginPetOwner(
      email,
      password
    );
    response.status(201).json(loginPetOwner);
  }
);
