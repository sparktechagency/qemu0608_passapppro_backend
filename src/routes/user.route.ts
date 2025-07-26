import {Router} from "express";
import {changePassword, changePhoto, updateProfile} from "../controller/user.controller";
import {upload} from "../lib/multer";

const router = Router()

router.route("/").put(updateProfile)
router.route("/change-password").post(changePassword)
router.route("/upload-profile").post(upload.single('file'), changePhoto)

export default router
