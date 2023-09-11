import { Router } from "express";
import { router as appointments } from "./appointments/routes.js";
import { router as users } from "./users/routes.js";
import { router as genders } from "./gender/routes.js";
import { router as userTypes } from "./userType/routes.js";
import { router as locations } from "./location/routes.js";
import { router as centers } from "./center/routes.js";
import { router as doctors } from "./doctor/routes.js";
import { router as specialties } from "./specialty/routes.js";
import { router as payments } from "./payment/routes.js";

// eslint-disable-next-line new-cap
export const router = Router();

router.use("/appointments", appointments);
router.use("/users", users);
router.use("/genders", genders);
router.use("/usertypes", userTypes);
router.use("/locations", locations);
router.use("/centers", centers);
router.use("/doctors", doctors);
router.use("/specialties", specialties);
router.use("/payments", payments);
