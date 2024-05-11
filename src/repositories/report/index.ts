import { ICreateReportRequestDto } from "../../dtos/report/icreate-report-request.dto";
import { prisma } from "../../prisma";
import { putObject } from "../../database/s3";
import { findPetOwnerById } from "../pet-owner";
import { notFoundError } from "../../helpers/errors-response";

import { randomUUID } from "node:crypto";
import { backblazeURL } from "../../database/constants";

export const createReport = async (data: ICreateReportRequestDto) => {
  const { clinicId, petId, petOwnerId, mimeType, path, buffer } = data;

  const petOwner = await findPetOwnerById(petOwnerId);

  if (!petOwner) {
    return notFoundError("pet owner");
  }

  const petOwnerName = petOwner.name.replace(" ", "_").toLowerCase();
  const pathUUID = randomUUID().concat("-").concat(petOwnerName).concat(path);

  console.log(pathUUID);

  const report = await prisma.report.create({
    data: {
      url: petOwnerName,
      path: `${petOwnerName}/${pathUUID}`,
      pet: { connect: { id: petId } },
      pet_owner: { connect: { id: petOwnerId } },
      clinic: { connect: { id: clinicId } },
    },
  });

  await prisma.report.update({
    where: { id: report.id },
    data: { url: backblazeURL.concat(report.path) },
  });

  await putObject(mimeType, `${petOwnerName}/${pathUUID}`, buffer);

  return report;
};

export const findReportById = async (id: string) => {
  const report = await prisma.report.findUnique({ where: { id } });

  if (!report) {
    return null;
  }

  return report;
};
