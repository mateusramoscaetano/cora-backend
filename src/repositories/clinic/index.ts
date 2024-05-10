import { ICreateClinicRequestDto } from "../../dtos/clinic/icreate-clinic-request.dto";
import { prisma } from "../../prisma";

export const createClinic = async (data: ICreateClinicRequestDto) => {
  const { address, email, name, password, phone } = data;

  const clinic = await prisma.clinic.create({
    data: {
      ...data,
      pet_owners: { create: [] },
      Report: { create: [] },
    },
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
