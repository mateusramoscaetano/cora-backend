export interface ICreatePetOwnerRequestDto {
  name: string;
  email: string;
  phone: string;
  clinicId?: string;
  password: string;
}

export interface CreatePetOwnerData {
  email: string;
  name: string;
  password: string;
  phone: string;
  doctor: {
    connect: { id: string };
  };
  clinic?: {
    connect: { id: string };
  };
}
