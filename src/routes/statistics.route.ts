import {Router} from "express";
import {getDashboardStatistics, getOverviewStatistics} from "../controller/statistics.controller";

const router = Router()

router.route("/").get(getDashboardStatistics)
router.route("/overview").get(getOverviewStatistics)

export default router
