export interface ICreateReportRequestDto {
  clinicId: string;
  petOwnerId: string;
  petId: string;
  mimeType?: string;
  path: string;
  buffer: Buffer;
}
