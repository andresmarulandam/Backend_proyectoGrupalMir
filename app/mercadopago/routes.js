import { Router } from "express";
import * as controller from "./controller.js";

// eslint-disable-next-line new-cap
export const router = Router();

router.route("/create-order").post(controller.createOrder);

router.route("/successpurchase").get(controller.successPurchase);
router.route("/failurepurchase").get(controller.failurePurchase);
router.route("/pendingpurchase").get(controller.pendingPurchase);

router.route("/webhook").post(controller.receiveWebhook);
