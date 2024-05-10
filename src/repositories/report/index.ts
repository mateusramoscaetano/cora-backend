import { connect } from "http2";
import { ICreateReportRequestDto } from "../../dtos/report/icreate-report-request.dto";
import { prisma } from "../../prisma";
import { putObject } from "../../database/s3";
import { findPetOwnerById } from "../pet-owner";
import { badRequest } from "../../helpers/errors-response";

export const createReport = async (data: ICreateReportRequestDto) => {
  const { buffer, clinicId, petId, petOwnerId, mimeType, path } = data;

  const petOwner = await findPetOwnerById(petOwnerId);

  if (!petOwner) {
    return badRequest("pet owner");
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
