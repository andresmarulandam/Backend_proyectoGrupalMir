import { Router } from "express";
import * as controller from "./controller.js";
import { router as appointmentsRouter } from "../appointments/routes.js";
import { auth, me, limit } from "../auth.js";

// eslint-disable-next-line new-cap
export const router = Router();

/**
 * /api/v1/users/signup POST        - CREATE
 * /api/v1/users/signin
 * /api/v1/users GET         - READ ALL
 * /api/v1/users/:id GET     - READ ONE
 * /api/v1/users/:id PUT     - UPDATE
 * /api/v1/users/:id DELETE  - DELETE
 */
router.route("/signup").post(limit, controller.signup);
router.route("/signin").post(limit, controller.signin);

router.route("/").get(controller.all);

router
  .route("/:id")
  .get(auth, me, controller.read)
  .put(auth, me, controller.update)
  .patch(auth, me, controller.update)
  .delete(auth, me, controller.remove);

router.use("/:userId/appointments", appointmentsRouter);
