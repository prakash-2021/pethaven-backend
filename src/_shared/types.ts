import { AdoptionStatus, Gender, PetSize } from "@prisma/client";

export interface PetRequestBody {
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: Gender;
  size: PetSize;
  color: string;
  healthStatus: string;
  adoptionStatus: AdoptionStatus;
  images: string[];
}
