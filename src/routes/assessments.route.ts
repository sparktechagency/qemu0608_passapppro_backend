import {Router} from "express";
import {
    createAssessment,
    deleteAssessment,
    getAssessment,
    getAssessments,
    updateAssessment
} from "../controller/assesment.controller";

const router = Router()

router.route("/:id").get(getAssessment)
router.route("/").get(getAssessments)
router.route("/").post(createAssessment)
router.route("/:id").put(updateAssessment)
router.route("/:id").delete(deleteAssessment)

export default router



