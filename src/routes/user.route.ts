import {Router} from "express";
import {changePassword, changePhoto, getUserProfile, updateProfile} from "../controller/user.controller";
import {upload} from "../lib/multer";
import {Protected} from "../lib/protected";

const router = Router()

router.route("/").get(Protected, getUserProfile)
router.route("/").put(Protected, updateProfile)
router.route("/change-password").put(Protected, changePassword)
router.route("/upload-profile").put(Protected, upload.single("avatar"), changePhoto)

export default router
