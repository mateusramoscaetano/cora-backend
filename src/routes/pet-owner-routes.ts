import { Router } from "express";
import { createPetOwner } from "../controllers/pet-owner/create-pet-owner";
import { authLogin } from "../middlewares/auth-login";
import { errorHandler } from "../middlewares/error-handler";
import { listPetOwners } from "../controllers/pet-owner/list-pet-owners";
import { listPetOwnerByClinic } from "../controllers/pet-owner/list-pet-owner-clinic";

const petOwnerRoutes = Router();

petOwnerRoutes.post("/pet-owner/create", authLogin, createPetOwner);
petOwnerRoutes.get("/pet-owner/list", listPetOwners);
petOwnerRoutes.get("/pet-owner/list/:id", listPetOwnerByClinic);

petOwnerRoutes.use(errorHandler);

export { petOwnerRoutes };
