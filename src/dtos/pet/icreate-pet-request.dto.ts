import { PetOwner, Report } from "@prisma/client";

export interface ICreatePetRequestDto {
  name: string;
  age: string;
}
