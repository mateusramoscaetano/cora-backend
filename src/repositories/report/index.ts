import { ICreateReportRequestDto } from "../../dtos/report/icreate-report-request.dto";
import { prisma } from "../../prisma";
import { deleteObject, putObject } from "../../database/s3";
import { findPetOwnerById } from "../pet-owner";
import { notFoundError } from "../../helpers/errors-response";
import { Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { backblazeURL } from "../../database/constants";
import { uid } from "../../lib/short-uid";
import { findPetById } from "../pet";
import { connect } from "node:http2";
import { findClinicById } from "../clinic";
import { report } from "node:process";

const { QueryMode } = Prisma;

export const createReport = async (data: ICreateReportRequestDto) => {
  const { petId, mimeType, path, buffer, clinicId } = data;

  const pet = await prisma.pet.findUnique({ where: { id: petId } });

  if (!pet) {
    return notFoundError("pet");
  }
  const clinic = await prisma.clinic.findUnique({ where: { id: clinicId } });

  if (!clinic) {
    return notFoundError("clinic");
  }

  const petOwner = await findPetOwnerById(pet.pet_owner_id);

  if (!petOwner) {
    return notFoundError("pet owner");
  }

  const petOwnerName = petOwner.name.replace(" ", "_").toLowerCase();
  const pathUUID = randomUUID().concat("-").concat(petOwnerName).concat(path);

  const report = await prisma.report.create({
    data: {
      url: petOwnerName,
      path: `${petOwnerName}/${pet.name.toLocaleLowerCase()}/${pathUUID}`,
      pet: { connect: { id: petId } },
      Clinic: { connect: { id: clinicId } },
    },
  });

  await prisma.report.update({
    where: { id: report.id },
    data: { url: backblazeURL.concat(report.path) },
  });

  await putObject(mimeType, report.path, buffer);

  return report;
};

export const findReportById = async (id: string) => {
  const report = await prisma.report.findUnique({ where: { id } });

  if (!report) {
    return null;
  }

  return report;
};

export const deleteReport = async (id: string) => {
  const report = await findReportById(id);

  if (!report) {
    return null;
  }

  await deleteObject(report.path);

  await prisma.report.delete({ where: { id } });
  return { message: "successfully deleted" };
};

export const listReports = async (id: string) => {
  const pet = await findPetById(id);

  if (!pet) {
    return notFoundError("pet");
  }

  const { reports } = pet;

  return reports;
};
export interface IListAllReportsOptions {
  page: string;
  searchTerm?: string;
}

export const listAllReports = async (options: IListAllReportsOptions) => {
  const itemsPerPage = 10;
  const pageAsNumber = parseInt(options.page, 10);
  const skip = (pageAsNumber - 1) * itemsPerPage;

  const where: Prisma.ReportWhereInput = {};

  if (options.searchTerm) {
    const searchTerm = options.searchTerm;

    where.OR = [
      {
        pet: {
          pet_owner: {
            name: {
              contains: searchTerm,
              mode: QueryMode.insensitive,
            },
          },
        },
      },
      {
        pet: {
          name: {
            contains: searchTerm,
            mode: QueryMode.insensitive,
          },
        },
      },
      {
        pet: {
          pet_owner: {
            doctor: {
              name: {
                contains: searchTerm,
                mode: QueryMode.insensitive,
              },
            },
          },
        },
      },
    ];
  }

  const reports = await prisma.report.findMany({
    where,
    select: {
      id: true,
      url: true,
      pet: {
        select: {
          pet_owner: {
            select: { name: true, doctor: { select: { name: true } } },
          },
          name: true,
        },
      },
      createdAt: true,
    },
    skip,
    take: itemsPerPage,
  });

  const totalReports = await prisma.report.count({ where });
  const totalPages = Math.ceil(totalReports / itemsPerPage);

  return { reports, page: pageAsNumber, totalPages };
};
export const listReportsByClinic = async (id: string) => {
  const clinic = await findClinicById(id);

  if (!clinic) {
    return notFoundError("pet");
  }

  const { report } = clinic;

  return report;
};
