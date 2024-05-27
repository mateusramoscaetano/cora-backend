import { Prisma } from "@prisma/client";
import { deleteObject } from "../../database/s3";
import { ICreatePetRequestDto } from "../../dtos/pet/icreate-pet-request.dto";
import { IUpdatePetRequestDto } from "../../dtos/pet/iupdate-pet-request.dto";
import { badRequest, notFoundError } from "../../helpers/errors-response";
import { prisma } from "../../prisma";
import { findPetOwnerById } from "../pet-owner";
const { QueryMode } = Prisma;

export const createPet = async (
  data: ICreatePetRequestDto,
  petOwnerId: string
) => {
  const { age, name, race, specie } = data;

  const petOwner = await findPetOwnerById(petOwnerId);

  if (!petOwner) {
    return badRequest("pet");
  }

  const pet = await prisma.pet.create({
    data: {
      race,
      specie,
      age,
      name,
      pet_owner: { connect: { id: petOwnerId } },
      reports: { create: [] },
    },
  });

  return pet;
};
export const updatePet = async (data: IUpdatePetRequestDto, id: string) => {
  const { age, name } = data;

  const pet = await prisma.pet.update({
    data: {
      age,
      name,
    },
    where: { id },
  });

  return pet;
};

export const findPetById = async (id: string) => {
  const pet = await prisma.pet.findUnique({
    where: { id },
    include: {
      reports: {
        select: { id: true, url: true },
      },
    },
  });

  if (!pet) {
    return null;
  }

  return pet;
};

export const listPets = async (id: string) => {
  const petOwner = await findPetOwnerById(id);

  if (!petOwner) {
    return null;
  }

  const pets = await prisma.pet.findMany({
    where: { pet_owner_id: id },
    select: { name: true, age: true, id: true },
  });

  return pets;
};

export const getPetDetail = async (id: string) => {
  const pet = await prisma.pet.findUnique({
    where: { id },
    include: {
      reports: { select: { id: true, url: true } },
      pet_owner: { select: { name: true } },
    },
  });

  if (!pet) {
    return null;
  }

  return pet;
};

export const deletePet = async (id: string) => {
  const pet = await prisma.pet.findUnique({
    where: { id },
    include: { reports: true },
  });

  if (!pet) {
    return notFoundError("pet");
  }

  const petOwner = await findPetOwnerById(pet.pet_owner_id);

  if (!petOwner) {
    return notFoundError("pet-owner");
  }

  await deleteObject(
    petOwner.name.replace(" ", "_").toLowerCase().concat(pet.name.toLowerCase())
  );

  await prisma.report.deleteMany({ where: { pet_id: id } });

  await prisma.pet.delete({ where: { id } });
  return { message: "successfully deleted" };
};

export const listAllPets = async (page: string, searchTerm?: string) => {
  const itemsPerPage = 10;
  const pageAsNumber = parseInt(page, 10);
  const skip = (pageAsNumber - 1) * itemsPerPage;

  const totalPets = await prisma.pet.count();
  const totalPages = Math.ceil(totalPets / itemsPerPage);

  const pets = await prisma.pet.findMany({
    where: { name: { contains: searchTerm, mode: QueryMode.insensitive } },
    skip: skip,
    take: itemsPerPage,
    select: { id: true, name: true, pet_owner: { select: { name: true } } },
  });

  const organizeResponseToIdAndName = pets.map((pet) => {
    return { petId: pet.id, name: `${pet.pet_owner.name} / ${pet.name}` };
  });

  return { pets: organizeResponseToIdAndName, page: pageAsNumber, totalPages };
};
