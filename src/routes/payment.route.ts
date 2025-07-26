import {Router} from "express";
import {
    createPayment,
    deletePayment,
    getAllPayments,
    getPaymentById,
    searchPayment
} from "../controller/payment.controller";

const router = Router()

router.route("/search").get(searchPayment)
router.route("/:id").get(getPaymentById)
router.route("/").get(getAllPayments)
router.route("/").post(createPayment)
router.route("/:id").delete(deletePayment)

export default router
