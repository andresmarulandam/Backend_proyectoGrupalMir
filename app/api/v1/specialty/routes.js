import { Router } from "express";
import * as controller from "./controller.js";
import { router as doctorsRouter } from "../doctor/routes.js";
import { router as centerSpecialtiesRouter } from "../centerSpecialty/routes.js";

// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true,
});

/**
 * /api/v1/specialties POST        - CREATE
 * /api/v1/specialties GET         - READ ALL
 * /api/v1/specialties/:id GET     - READ ONE
 * /api/v1/specialties/:id PUT     - UPDATE
 * /api/v1/specialties/:id DELETE  - DELETE
 */
router.route("/").post(controller.create).get(controller.all);

router
  .route("/:id")
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.remove);

router.use("/:specialtyId/doctors", doctorsRouter);
router.use("/:specialtyId/centerspecialties", centerSpecialtiesRouter);
