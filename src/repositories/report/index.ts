import { ICreateReportRequestDto } from "../../dtos/report/icreate-report-request.dto";
import { prisma } from "../../prisma";
import { putObject } from "../../database/s3";
import { findPetOwnerById } from "../pet-owner";
import { notFoundError } from "../../helpers/errors-response";
import { getObject } from "../test";

export const createReport = async (data: ICreateReportRequestDto) => {
  const { clinicId, petId, petOwnerId, mimeType, path, buffer } = data;

  const petOwner = await findPetOwnerById(petOwnerId);

  if (!petOwner) {
    return notFoundError("pet owner");
  }

  const petOwnerName = petOwner.name.replace(" ", "_").toLowerCase();

  const report = await prisma.report.create({
    data: {
      name: petOwnerName,
      path: `${petOwnerName}/${path}`,
      pet: { connect: { id: petId } },
      pet_owner: { connect: { id: petOwnerId } },
      clinic: { connect: { id: clinicId } },
    },
  });

  await putObject(mimeType, `${petOwnerName}/${path}`, buffer);

  return report;
};

export const findReportById = async (id: string) => {
  const report = await prisma.report.findUnique({ where: { id } });

  if (!report) {
    return null;
  }

  return report;
};
