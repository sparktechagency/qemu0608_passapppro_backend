import {Router} from "express";
import {
    createSubmission,
    deleteSubmission,
    getSubmission,
    searchSubmission
} from "../controller/submission.crontroller";

const router = Router()

router.route("/").get(getSubmission)
router.route("/search").get(searchSubmission)
router.route("/").post(createSubmission)
router.route("/:id").delete(deleteSubmission)

export default router
