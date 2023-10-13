import { Router } from "express";
import * as controller from "./controller.js";

// eslint-disable-next-line new-cap
export const router = Router();

router.route("/create-order").post(controller.createOrder);

router.route("/webhook").post(controller.receiveWebhook);
