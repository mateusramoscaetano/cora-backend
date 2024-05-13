import { prisma } from "../../prisma";
import { ICreateDoctorRequestDto } from "../../dtos/doctor/icreate-doctor-request.dto";
import { IUpdateDoctorRequestDto } from "../../dtos/doctor/iupdate-doctor-request.dto";
import { Prisma } from "@prisma/client";
const { QueryMode } = Prisma;

export const findDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: { id },
  });

  if (!doctor) {
    return null;
  }

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
export const updateDoctor = async (
  data: IUpdateDoctorRequestDto,
  id: string
) => {
  const doctor = await prisma.doctor.update({ data, where: { id } });

  return doctor;
};

export const findDoctorByEmail = async (email: string) => {
  const doctor = await prisma.doctor.findUnique({ where: { email } });

  if (!doctor) {
    return null;
  }

  return doctor;
};

export const listDoctors = async (page: string, name?: string) => {
  const itemsPerPage = 10;
  const pageAsNumber = parseInt(page, 10);
  const skip = (pageAsNumber - 1) * itemsPerPage;

  const totalDoctors = await prisma.doctor.count();
  const totalPages = Math.ceil(totalDoctors / itemsPerPage);

  const doctors = await prisma.doctor.findMany({
    where: { name: { contains: name, mode: QueryMode.insensitive } },
    skip: skip,
    take: itemsPerPage,
    select: { email: true, id: true, name: true, role: true },
  });

  return { doctors, page: pageAsNumber, totalPages };
};

export const deleteDoctor = async (id: string) => {
  await prisma.doctor.delete({ where: { id } });

  return { message: "successfully deleted" };
};
