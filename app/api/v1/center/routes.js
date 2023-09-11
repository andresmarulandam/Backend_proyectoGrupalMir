import { Router } from "express";
import * as controller from "./controller.js";

// eslint-disable-next-line new-cap
export const router = Router();

/**
 * /api/v1/centers POST        - CREATE
 * /api/v1/centers GET         - READ ALL
 * /api/v1/centers/:id GET     - READ ONE
 * /api/v1/centers/:id PUT     - UPDATE
 * /api/v1/centers/:id DELETE  - DELETE
 */
router.route("/").post(controller.create).get(controller.all);

router
  .route("/:id")
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.remove);
