import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { ICreatePetOwnerRequestDto } from "../../dtos/pet-owner/icreate-pet-owner-request.dto";
import { CreatePetOwnerService } from "../../services/pet-owner/create-pet-owner";
import { notFoundError } from "../../helpers/errors-response";

export const createPetOwner = tryCatch(
  async (request: Request, response: Response) => {
    const { email, name, password, phone, clinicId } =
      request.body as ICreatePetOwnerRequestDto;
    const { id } = request.user;

    const createPetOwnerInstance = new CreatePetOwnerService();
    const petOwner = await createPetOwnerInstance.createPetOwner(
      {
        email,
        name,
        password,
        phone,
        clinicId,
      },
      id
    );

    if (!petOwner) {
      return notFoundError("pet owner");
    }

    const { password: _, ...result } = petOwner;

    response.status(201).json(result);
  }
);
