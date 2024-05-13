import { Router } from "express";
import { errorHandler } from "../middlewares/error-handler";
import { createPet } from "../controllers/pet/create-pet";
import { listPets } from "../controllers/pet/list-pets";
import { getPet } from "../controllers/pet/get-pet";
import { validateZodParams } from "../middlewares/validation-zod-params";
import { idParamsSchema } from "../zod-schemas/id-schema";
import { updatePet } from "../controllers/pet/update-pet";
import { validateZod } from "../middlewares/validation-zod";
import { CreatePetRequestDtoSchema } from "../zod-schemas/pet/create-pet.schema";
import { CreatePetParamsSchema } from "../zod-schemas/pet/create-report-params.schema";
import { UpdatePetOwnerRequestDtoSchema } from "../zod-schemas/pet-owner/update-pet-owner.schema";
import { deletePet } from "../controllers/pet/delete-pet";

const petRoutes = Router();

petRoutes.post(
  "/pet/create/:petOwnerId",
  validateZodParams(CreatePetParamsSchema),
  validateZod(CreatePetRequestDtoSchema),
  createPet
);
petRoutes.put(
  "/pet/:id",
  validateZodParams(idParamsSchema),
  validateZod(UpdatePetOwnerRequestDtoSchema),
  updatePet
);
petRoutes.get("/pet/list/:id", validateZodParams(idParamsSchema), listPets);
petRoutes.get("/pet/:id", validateZodParams(idParamsSchema), getPet);

petRoutes.delete("/pet/:id", validateZodParams(idParamsSchema), deletePet);

petRoutes.use(errorHandler);

export { petRoutes };
