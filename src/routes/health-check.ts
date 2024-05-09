import { Router, type Request, type Response } from "express";

const routes = Router();

routes.get("/", (request: Request, response: Response) => {
  return response.status(200).json({ message: "server is running 🚀🚀🚀" });
});

export { routes };
