import express, {Router} from "express";
import {
    createPayment,
    createPaymentIntent,
    deletePayment,
    getAllPayments,
    getPaymentById,
    paymentWebhook,
    searchPayment
} from "../controller/payment.controller";

const router = Router()

router.route("/webhook").get(express.raw({
    type: "application/json",
}), paymentWebhook)

router.route("/create-payment").post(createPaymentIntent)

router.route("/search").get(searchPayment)
router.route("/:id").get(getPaymentById)
router.route("/").get(getAllPayments)
router.route("/").post(createPayment)
router.route("/:id").delete(deletePayment)

export default router
