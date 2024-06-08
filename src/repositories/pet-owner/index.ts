import { Prisma } from "@prisma/client";
import {
  CreatePetOwnerData,
  ICreatePetOwnerRequestDto,
} from "../../dtos/pet-owner/icreate-pet-owner-request.dto";
import {
  IUpdatePetOwnerRequestDto,
  UpdatePetOwnerData,
} from "../../dtos/pet-owner/iupdate-pet-owner-request.dto";
import { badRequest, notFoundError } from "../../helpers/errors-response";
import { prisma } from "../../prisma";
import { findDoctorById } from "../doctor";
import { IListPetOwnersOptions } from "../../dtos/pet-owner/ilist-pet-owner-options.dto";

const { QueryMode } = Prisma;

export const createPetOwner = async (
  data: ICreatePetOwnerRequestDto,
  doctorId: string
) => {
  const { email, name, password, phone, clinicId } = data;

  const petOwnerExist = await findPetOwnerByEmail(email);

  if (petOwnerExist) {
    return badRequest("email");
  }

  const doctor = await findDoctorById(doctorId);

  if (!doctor) {
    return notFoundError("doctor");
  }

  const createData: CreatePetOwnerData = {
    email,
    name,
    password,
    phone,
    doctor: {
      connect: { id: doctor.id },
    },
  };

  if (clinicId) {
    createData.clinic = { connect: { id: clinicId } };
  }

  const petOwner = await prisma.petOwner.create({ data: createData });

  return petOwner;
};
export const updateClinicPetOwner = async (
  data: IUpdatePetOwnerRequestDto,
  doctorId: string,
  id: string
) => {
  const { email, name, password, phone, clinicId } = data;

  const doctor = await findDoctorById(doctorId);

  if (!doctor) {
    return notFoundError("doctor");
  }

  const updateData: UpdatePetOwnerData = {
    email,
    name,
    password,
    phone,
    doctor: {
      connect: { id: doctor.id },
    },
  };

  if (clinicId) {
    const clinicExist = await prisma.clinic.findUnique({
      where: { id: clinicId },
    });

    if (!clinicExist) {
      return notFoundError("clinic");
    }

    updateData.clinic = { connect: { id: clinicId } };
  }

  const petOwner = await prisma.petOwner.update({
    data: updateData,
    where: { id },
  });

  return petOwner;
};

export const findPetOwnerByEmail = async (email: string) => {
  const petOwner = await prisma.petOwner.findUnique({ where: { email } });

  if (!petOwner) {
    return null;
  }

  return petOwner;
};
export const findPetOwnerById = async (id: string) => {
  const petOwner = await prisma.petOwner.findUnique({
    where: { id },
    include: { pets: true },
  });

  if (!petOwner) {
    return null;
  }

  return petOwner;
};

export const listPetOwners = async (options: IListPetOwnersOptions) => {
  const itemsPerPage = 10;
  const pageAsNumber = parseInt(options.page, 10);
  const skip = (pageAsNumber - 1) * itemsPerPage;

  const totalOwners = await prisma.petOwner.count();
  const totalPages = Math.ceil(totalOwners / itemsPerPage);

  const where: Prisma.PetOwnerWhereInput = {};

  if (options.searchTerm) {
    const searchTerm = options.searchTerm;

    const doctors = await prisma.doctor.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: QueryMode.insensitive,
        },
      },
    });

    const doctorIds = doctors.map((doctor) => doctor.id);

    where.OR = [
      {
        name: {
          contains: searchTerm,
          mode: QueryMode.insensitive,
        },
      },
      {
        pets: {
          some: {
            name: {
              contains: searchTerm,
              mode: QueryMode.insensitive,
            },
          },
        },
      },
      {
        doctorId: {
          in: doctorIds,
        },
      },
    ];
  }

  const petOwners = await prisma.petOwner.findMany({
    where,
    skip,
    take: itemsPerPage,
    include: { pets: { select: { id: true } } },
    orderBy: { createdAt: "desc" },
  });

  return { petOwners, page: pageAsNumber, totalPages };
};

export const listPetOwnersByClinic = async (id: string, page: string) => {
  const itemsPerPage = 10;
  const pageAsNumber = parseInt(page, 10);
  const skip = (pageAsNumber - 1) * itemsPerPage;

  const totalClinics = await prisma.clinic.count();
  const totalPages = Math.ceil(totalClinics / itemsPerPage);

  const petOwners = await prisma.petOwner.findMany({
    skip,
    take: itemsPerPage,
    select: { id: true, name: true },
    where: { clinicId: id },
  });

  return { petOwners, page: pageAsNumber, totalPages };
};

export const getPetOwner = async (id: string) => {
  const petOwner = await prisma.petOwner.findUnique({
    where: { id },
    include: { pets: { select: { id: true, name: true } } },
  });

  if (!petOwner) {
    return null;
  }

  return petOwner;
};

export const deletePetOwner = async (id: string) => {
  const petOwner = await findPetOwnerById(id);

  if (!petOwner) {
    return notFoundError("pet owner");
  }

  for (let pet of petOwner.pets) {
    await prisma.report.deleteMany({ where: { pet_id: pet.id } });
  }

  await prisma.pet.deleteMany({ where: { pet_owner_id: id } });

  await prisma.petOwner.delete({ where: { id } });
  return { message: "successfully deleted" };
};
