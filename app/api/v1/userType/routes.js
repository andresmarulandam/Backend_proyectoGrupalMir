import { Router } from "express";
import * as controller from "./controller.js";

// eslint-disable-next-line new-cap
export const router = Router();

/**
 * /api/v1/userTypes POST        - CREATE
 * /api/v1/userTypes GET         - READ ALL
 * /api/v1/userTypes/:id GET     - READ ONE
 * /api/v1/userTypes/:id PUT     - UPDATE
 * /api/v1/userTypes/:id DELETE  - DELETE
 */
router.route("/").post(controller.create).get(controller.all);

router
  .route("/:id")
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.remove);
