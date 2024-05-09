import { ICreatePetOwnerRequestDto } from "../../dtos/doctor/icreate-pet-owner-request.dto";
import { badRequest } from "../../helpers/errors-response";
import { prisma } from "../../prisma";
import { findDoctorById } from "../doctor";

export const createPetOwner = async (
  data: ICreatePetOwnerRequestDto,
  doctorId: string
) => {
  const { email, name, password, phone } = data;

  const petOwner = await findPetOwnerByEmail(email);

  if (petOwner) {
    return badRequest("pet owner");
  }

  const doctor = await findDoctorById(doctorId);

  if (!doctor) {
    return badRequest("doctor");
  }

  if (doctor) {
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
      },
    });

    return petOwner;
  }
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
