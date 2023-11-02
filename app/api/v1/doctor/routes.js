import { Router } from "express";
import * as controller from "./controller.js";
import { router as appointmentsRouter } from "../appointments/routes.js";
import { limit } from "../auth.js";

// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true,
});

/**
 * /api/v1/doctors POST        - CREATE
 * /api/v1/doctors GET         - READ ALL
 * /api/v1/doctors/:id GET     - READ ONE
 * /api/v1/doctors/:id PUT     - UPDATE
 * /api/v1/doctors/:id DELETE  - DELETE
 */
router.route("/").post(limit, controller.create).get(controller.all);
router.route("/favorites").get(controller.getFavoriteDoctors);
router
  .route("/:id")
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.remove);

router.use("/:doctorId/appointments", appointmentsRouter);

router.route("/:id/favorite").put(controller.toggleFavorite);
