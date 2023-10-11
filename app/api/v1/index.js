import { Router } from "express";
import { router as appointments } from "./appointments/routes.js";
import { router as users } from "./users/routes.js";
import { router as locations } from "./location/routes.js";
import { router as centers } from "./center/routes.js";
import { router as doctors } from "./doctor/routes.js";
import { router as specialties } from "./specialty/routes.js";
import { router as payments } from "./payment/routes.js";
import { router as centerspecialties } from "./centerSpecialty/routes.js";
import { router as mercadopago } from "../../mercadopago/routes.js";

// eslint-disable-next-line new-cap
export const router = Router();

router.use("/appointments", appointments);
router.use("/users", users);
router.use("/locations", locations);
router.use("/centers", centers);
router.use("/doctors", doctors);
router.use("/specialties", specialties);
router.use("/payments", payments);
router.use("/centerspecialties", centerspecialties);
router.use("/mercadopago", mercadopago);
