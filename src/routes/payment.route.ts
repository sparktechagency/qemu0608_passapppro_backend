import {Router} from "express";
import {createPayment, deletePayment, getAllPayments, getPaymentById} from "../controller/payment.controller";

const router = Router()

router.route("/:id").get(getPaymentById)
router.route("/").get(getAllPayments)
router.route("/").post(createPayment)
router.route("/:id").delete(deletePayment)

export default router
