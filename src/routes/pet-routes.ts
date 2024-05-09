import { Router } from "express";
import { errorHandler } from "../middlewares/error-handler";
import { createPet } from "../controllers/pet/create-pet";

const petRoutes = Router();

petRoutes.post("/pet/create/:petOwnerId", createPet);

petRoutes.use(errorHandler);

export { petRoutes };
