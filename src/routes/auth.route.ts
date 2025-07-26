import {Router} from "express";
import {login, logout, refreshToken, signUp} from "../controller/auth.controller";
import {Protected} from "../lib/protected";

const router = Router()

router.route("/login").post(login)
router.route("/signup").post(signUp)
router.route("/refresh-token/:token").get(refreshToken)
router.route("/forgot-password")
router.route("/verify-email")
router.route("/resend-verify-email")
router.route("/reset-password")
router.route("/logout").get(Protected, logout)

export default router
