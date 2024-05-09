import express from "express";
import cors from "cors";
import { routes } from "../routes/health-check";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(routes);

export { app };
