import { prisma } from "../../prisma";

export const findDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({ where: { id } });

  return doctor;
};
