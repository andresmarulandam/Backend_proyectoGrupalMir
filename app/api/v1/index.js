import { Router } from "express";
import { router as appointments } from "./appointments/routes.js";

// eslint-disable-next-line new-cap
export const router = Router();

router.use("/appointments", appointments);
