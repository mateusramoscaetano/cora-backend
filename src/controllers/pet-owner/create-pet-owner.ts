import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { ICreateDoctorRequestDto } from "../../dtos/doctor/icreate-doctor-request.dto";
import { CreateDoctorService } from "../../services/doctor/create-doctor";
import { ICreatePetOwnerRequestDto } from "../../dtos/doctor/icreate-pet-owner-request.dto";
import { CreatePetOwnerService } from "../../services/pet-owner/create-pet-owner";

export const createPetOwner = tryCatch(
  async (request: Request, response: Response) => {
    const { email, name, password, phone } =
      request.body as ICreatePetOwnerRequestDto;
    const { id } = request.user;

    const createPetOwnerInstance = new CreatePetOwnerService();
    const petOwner = await createPetOwnerInstance.createPetOwner(
      {
        email,
        name,
        password,
        phone,
      },
      id
    );

    response.status(201).json(petOwner);
  }
);
