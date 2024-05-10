import { ICreateReportRequestDto } from "../../dtos/report/icreate-report-request.dto";
import { badRequest } from "../../helpers/errors-response";
import { findClinicById } from "../../repositories/clinic";
import { findPetById } from "../../repositories/pet";
import { findPetOwnerById } from "../../repositories/pet-owner";
import { createReport } from "../../repositories/report";

export class CreateReportService {
  async createReportService(data: ICreateReportRequestDto) {
    const { clinicId, petId, petOwnerId } = data;

    const petOwner = await findPetOwnerById(petOwnerId);

    if (!petOwner) {
      return badRequest("pet owner");
    }

    const pet = await findPetById(petId);
    if (!pet) {
      return badRequest("pet");
    }

    const clinic = await findClinicById(clinicId);

    if (!clinic) {
      return badRequest("clinic");
    }

    const report = await createReport(data);

    return report;
  }
}
