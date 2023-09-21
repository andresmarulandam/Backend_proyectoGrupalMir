import { Router } from "express";
import * as controller from "./controller.js";
import { auth } from "../auth.js";

// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true,
});

/**
 * /api/v1/appointments POST        - CREATE
 * /api/v1/appointments GET         - READ ALL
 * /api/v1/appointments/:id GET     - READ ONE
 * /api/v1/appointments/:id PUT     - UPDATE
 * /api/v1/appointments/:id DELETE  - DELETE
 */
router.route("/").post(auth, controller.create).get(controller.all);

router
  .route("/:id")
  .get(controller.read)
  .put(auth, controller.update)
  .patch(auth, controller.update)
  .delete(auth, controller.remove);
