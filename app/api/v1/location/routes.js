import { Router } from "express";
import * as controller from "./controller.js";
import { limit } from "../auth.js";
// eslint-disable-next-line new-cap
export const router = Router();

/**
 * /api/v1/locations POST        - CREATE
 * /api/v1/locations GET         - READ ALL
 * /api/v1/locations/:id GET     - READ ONE
 * /api/v1/locations/:id PUT     - UPDATE
 * /api/v1/locations/:id DELETE  - DELETE
 */
router.route("/").post(limit, controller.create).get(controller.all);

router
  .route("/:id")
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.remove);
