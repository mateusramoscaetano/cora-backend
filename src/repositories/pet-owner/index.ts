import { ICreatePetOwnerRequestDto } from "../../dtos/doctor/icreate-pet-owner-request.dto";
import { badRequest } from "../../helpers/errors-response";
import { prisma } from "../../prisma";
import { findDoctorById } from "../doctor";

export const createPetOwner = async (
  data: ICreatePetOwnerRequestDto,
  doctorId: string
) => {
  const { email, name, password, phone, clinicId } = data;

  const petOwnerExist = await findPetOwnerByEmail(email);

  if (petOwnerExist) {
    return badRequest("pet owner");
  }

  const doctor = await findDoctorById(doctorId);

  if (!doctor) {
    return badRequest("doctor");
  }

  const petOwner = await prisma.petOwner.create({
    data: {
      email,
      name,
      password,
      phone,
      pets: { create: [] },
      doctor: {
        connect: { id: doctor.id },
      },
      clinic: { connect: { id: clinicId } },
    },
  });

  return petOwner;
};

export const findPetOwnerByEmail = async (email: string) => {
  const petOwner = await prisma.petOwner.findUnique({ where: { email } });

  if (!petOwner) {
    return null;
  }

  return petOwner;
};
export const findPetOwnerById = async (id: string) => {
  const petOwner = await prisma.petOwner.findUnique({ where: { id } });

  if (!petOwner) {
    return null;
  }

  return petOwner;
};

export const listPetOwners = async () => {
  const petOwners = await prisma.petOwner.findMany({
    select: { id: true, name: true },
  });

  return petOwners;
};
export const listPetOwnersByClinic = async (id: string) => {
  const petOwners = await prisma.petOwner.findMany({
    select: { id: true, name: true },
    where: { clinicId: id },
  });

  return petOwners;
};
