import { Router } from "express";
import { createPetOwner } from "../controllers/pet-owner/create-pet-owner";
import { authLogin } from "../middlewares/auth-login";
import { errorHandler } from "../middlewares/error-handler";
import { listPetOwners } from "../controllers/pet-owner/list-pet-owners";
import { listPetOwnerByClinic } from "../controllers/pet-owner/list-pet-owner-clinic";
import { getPetOwner } from "../controllers/pet-owner/get-pet-owner";
import { validateZodParams } from "../middlewares/validation-zod-params";
import { idParamsSchema } from "../zod-schemas/id-schema";

const petOwnerRoutes = Router();

petOwnerRoutes.post("/pet-owner/create", authLogin, createPetOwner);
petOwnerRoutes.get("/pet-owner/list", listPetOwners);
petOwnerRoutes.get(
  "/pet-owner/list/:id",
  validateZodParams(idParamsSchema),
  listPetOwnerByClinic
);
petOwnerRoutes.get(
  "/pet-owner/:id",
  validateZodParams(idParamsSchema),
  getPetOwner
);

petOwnerRoutes.use(errorHandler);

export { petOwnerRoutes };
