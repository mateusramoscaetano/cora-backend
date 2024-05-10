import express from "express";
import cors from "cors";
import { routes } from "../routes/health-check";
import { doctorRoutes } from "../routes/doctor-routes";
import { petOwnerRoutes } from "../routes/pet-owner-routes";
import { petRoutes } from "../routes/pet-routes";
import { clinicRoutes } from "../routes/clinic-routes";
import { reportRoutes } from "../routes/report-routes";

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
app.use(doctorRoutes);
app.use(petOwnerRoutes);
app.use(petRoutes);
app.use(clinicRoutes);
app.use(reportRoutes);

export { app };
