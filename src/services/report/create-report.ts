import { ICreateReportRequestDto } from "../../dtos/report/icreate-report-request.dto";
import { notFoundError } from "../../helpers/errors-response";
import { findClinicById } from "../../repositories/clinic";
import { findPetById } from "../../repositories/pet";
import { findPetOwnerById } from "../../repositories/pet-owner";
import { createReport } from "../../repositories/report";

export class CreateReportService {
  async createReportService(data: ICreateReportRequestDto) {
    const { clinicId, petId, petOwnerId } = data;

    const petOwner = await findPetOwnerById(petOwnerId);

    if (!petOwner) {
      return notFoundError("pet owner");
    }

    const pet = await findPetById(petId);
    if (!pet) {
      return notFoundError("pet");
    }

    const clinic = await findClinicById(clinicId);

    if (!clinic) {
      return notFoundError("clinic");
    }

    const report = await createReport(data);

    return report;
  }
}
