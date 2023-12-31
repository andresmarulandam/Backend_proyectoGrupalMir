import { Router } from "express";
import * as controller from "./controller.js";
import { router as appointmentsRouter } from "../appointments/routes.js";
import { router as doctorsRouter } from "../doctor/routes.js";
import { router as centerspecialtiesRouter } from "../centerSpecialty/routes.js";
import { limit } from "../auth.js";

// eslint-disable-next-line new-cap
export const router = Router();

/**
 * /api/v1/centers POST        - CREATE
 * /api/v1/centers GET         - READ ALL
 * /api/v1/centers/:id GET     - READ ONE
 * /api/v1/centers/:id PUT     - UPDATE
 * /api/v1/centers/:id DELETE  - DELETE
 */
router.route("/").post(limit, controller.create).get(controller.all);

router
  .route("/:id")
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.remove);

router.use("/:centerId/appointments", appointmentsRouter);
router.use("/:centerId/doctors", doctorsRouter);
router.use("/:centerId/centerspecialties", centerspecialtiesRouter);
