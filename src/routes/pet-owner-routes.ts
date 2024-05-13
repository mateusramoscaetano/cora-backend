import { Router } from "express";
import { createPetOwner } from "../controllers/pet-owner/create-pet-owner";
import { authLogin } from "../middlewares/auth-login";
import { errorHandler } from "../middlewares/error-handler";
import { listPetOwners } from "../controllers/pet-owner/list-pet-owners";
import { listPetOwnerByClinic } from "../controllers/pet-owner/list-pet-owner-clinic";
import { getPetOwner } from "../controllers/pet-owner/get-pet-owner";
import { validateZodParams } from "../middlewares/validation-zod-params";
import { idParamsSchema } from "../zod-schemas/id-schema";
import { updatePetOwner } from "../controllers/pet-owner/update-pet-owner";
import { validateZod } from "../middlewares/validation-zod";
import { CreatePetOwnerRequestDtoSchema } from "../zod-schemas/pet-owner/create-pet-owner.schema";
import { UpdatePetOwnerRequestDtoSchema } from "../zod-schemas/pet-owner/update-pet-owner.schema";
import { loginPetOwner } from "../controllers/pet-owner/login-pet-owner";
import { deletePetOwner } from "../controllers/pet-owner/delete-pet-owner";

const petOwnerRoutes = Router();

petOwnerRoutes.post(
  "/pet-owner/create",
  authLogin,
  validateZod(CreatePetOwnerRequestDtoSchema),
  createPetOwner
);
petOwnerRoutes.put(
  "/pet-owner/:id",
  authLogin,
  validateZodParams(idParamsSchema),
  validateZod(UpdatePetOwnerRequestDtoSchema),
  updatePetOwner
);

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

petOwnerRoutes.post(
  "/pet-owner/login",
  validateZodParams(idParamsSchema),
  loginPetOwner
);

petOwnerRoutes.delete(
  "/pet-owner/:id",
  validateZodParams(idParamsSchema),
  deletePetOwner
);

petOwnerRoutes.use(errorHandler);

export { petOwnerRoutes };
