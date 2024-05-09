import { prisma } from "../../prisma";
import { ICreateDoctorRequestDto } from "../../dtos/doctor/icreate-doctor-request.dto";
import { badRequest } from "../../helpers/errors-response";

export const findDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({ where: { id } });

  return doctor;
};

export const createDoctor = async (data: ICreateDoctorRequestDto) => {
  const doctor = await prisma.doctor.create({
    data: {
      ...data,
      pet_owners: { create: [] },
    },
  });

  return doctor;
};

export const findDoctorByEmail = async (email: string) => {
  const doctor = await prisma.doctor.findUnique({ where: { email } });

  if (!doctor) {
    return null;
  }

  return doctor;
};
