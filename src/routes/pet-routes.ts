import { Router } from "express";
import { errorHandler } from "../middlewares/error-handler";
import { createPet } from "../controllers/pet/create-pet";
import { listPets } from "../controllers/pet/list-pets";
import { getPet } from "../controllers/pet/get-pet";

const petRoutes = Router();

petRoutes.post("/pet/create/:petOwnerId", createPet);
petRoutes.get("/pet/list/:id", listPets);
petRoutes.get("/pet/:id", getPet);

petRoutes.use(errorHandler);

export { petRoutes };
