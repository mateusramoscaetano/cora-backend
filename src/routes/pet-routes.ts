import { Router } from "express";
import { errorHandler } from "../middlewares/error-handler";
import { createPet } from "../controllers/pet/create-pet";
import { listPets } from "../controllers/pet/list-pets";
import { getPet } from "../controllers/pet/get-pet";
import { validateZodParams } from "../middlewares/validation-zod-params";
import { idParamsSchema } from "../zod-schemas/id-schema";

const petRoutes = Router();

petRoutes.post("/pet/create/:petOwnerId", createPet);
petRoutes.get("/pet/list/:id", validateZodParams(idParamsSchema), listPets);
petRoutes.get("/pet/:id", validateZodParams(idParamsSchema), getPet);

petRoutes.use(errorHandler);

export { petRoutes };
