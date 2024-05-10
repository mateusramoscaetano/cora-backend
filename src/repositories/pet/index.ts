import { ICreatePetRequestDto } from "../../dtos/pet/icreate-pet-request.dto";
import { badRequest } from "../../helpers/errors-response";
import { prisma } from "../../prisma";
import { findPetOwnerById } from "../pet-owner";

export const createPet = async (
  data: ICreatePetRequestDto,
  petOwnerId: string
) => {
  const { age, name } = data;

  const petOwner = await findPetOwnerById(petOwnerId);

  if (!petOwner) {
    return badRequest("pet");
  }

  const pet = await prisma.pet.create({
    data: {
      age,
      name,
      pet_owner: { connect: { id: petOwnerId } },
      reports: { create: [] },
    },
  });

  return pet;
};

export const findPetById = async (id: string) => {
  const pet = await prisma.pet.findUnique({ where: { id } });

  if (!pet) {
    return null;
  }

  return pet;
};
