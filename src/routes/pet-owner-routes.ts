import { Router } from "express";
import { createPetOwner } from "../controllers/pet-owner/create-pet-owner";
import { authLogin } from "../middlewares/auth-login";
import { errorHandler } from "../middlewares/error-handler";

const petOwnerRoutes = Router();

petOwnerRoutes.post("/create/pet-owner", authLogin, createPetOwner);

petOwnerRoutes.use(errorHandler);

export { petOwnerRoutes };
