import {Router} from "express";
import {createSubmission, deleteSubmission} from "../controller/submission.crontroller";

const router = Router()

router.route("/")
router.route("/search")
router.route("/create").post(createSubmission)
router.route("/delete/:id").delete(deleteSubmission)

export default router
