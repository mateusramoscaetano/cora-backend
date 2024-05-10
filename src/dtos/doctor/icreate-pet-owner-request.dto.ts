import { Doctor, Pet } from "@prisma/client";

export interface ICreatePetOwnerRequestDto {
  name: string;

  email: string;
  phone: string;
  clinicId?: string;
  password: string;
}
