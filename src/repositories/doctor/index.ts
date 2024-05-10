import { prisma } from "../../prisma";
import { ICreateDoctorRequestDto } from "../../dtos/doctor/icreate-doctor-request.dto";

export const findDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: { id },
    select: { email: true, id: true, name: true, phone: true, role: true },
  });

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

export const listDoctors = async (page: string) => {
  const itemsPerPage = 10;
  const pageAsNumber = parseInt(page, 10);
  const skip = (pageAsNumber - 1) * itemsPerPage;

  const totalClinics = await prisma.clinic.count();
  const totalPages = Math.ceil(totalClinics / itemsPerPage);

  const doctors = await prisma.doctor.findMany({
    skip: skip,
    take: itemsPerPage,
    select: { email: true, id: true, name: true, role: true },
  });

  return { doctors, page: pageAsNumber, totalPages };
};
