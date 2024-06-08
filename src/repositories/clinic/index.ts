import { ICreateClinicRequestDto } from "../../dtos/clinic/icreate-clinic-request.dto";
import { IUpdateClinicRequestDto } from "../../dtos/clinic/iupdate-clinic-request.dto";
import { notFoundError } from "../../helpers/errors-response";
import { prisma } from "../../prisma";
import { Prisma } from "@prisma/client";
const { QueryMode } = Prisma;

export const createClinic = async (data: ICreateClinicRequestDto) => {
  const clinic = await prisma.clinic.create({
    data: {
      ...data,
    },
  });

  return clinic;
};
export const updateClinic = async (
  data: IUpdateClinicRequestDto,
  id: string
) => {
  const clinic = await prisma.clinic.update({
    data,
    where: { id },
  });

  return clinic;
};

export const findClinicByEmail = async (email: string) => {
  const clinic = await prisma.clinic.findUnique({ where: { email } });

  if (!clinic) {
    return null;
  }

  return clinic;
};

export const findClinicById = async (id: string) => {
  const clinic = await prisma.clinic.findUnique({
    where: { id },
    include: { report: true },
  });

  if (!clinic) {
    return null;
  }

  return clinic;
};

export const clinicDetail = async (id: string) => {
  const clinic = await prisma.clinic.findUnique({
    where: { id },
  });

  if (!clinic) {
    return notFoundError("clinic");
  }

  return clinic;
};

export const listClinics = async (page: string, name?: string) => {
  const itemsPerPage = 10;
  const pageAsNumber = parseInt(page, 10);
  const skip = (pageAsNumber - 1) * itemsPerPage;

  const totalClinics = await prisma.clinic.count();
  const totalPages = Math.ceil(totalClinics / itemsPerPage);

  const clinics = await prisma.clinic.findMany({
    skip,
    take: itemsPerPage,
    where: { name: { contains: name, mode: QueryMode.insensitive } },
    orderBy: { createdAt: "desc" },
  });

  return { clinics, page: pageAsNumber, totalPages };
};

export const deleteClinic = async (id: string) => {
  await prisma.clinic.delete({
    where: { id },
  });
  return { message: "successfully deleted" };
};
