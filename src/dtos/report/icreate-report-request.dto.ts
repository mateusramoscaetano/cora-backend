export interface ICreateReportRequestDto {
  petId: string;
  mimeType?: string;
  path: string;
  buffer: Buffer;
  clinicId: string;
  doctorId: string;
}
