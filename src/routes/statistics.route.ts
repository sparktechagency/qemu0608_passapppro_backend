import {Router} from "express";
import {
    getDashboardStatistics,
    getOverviewStatistics,
    getOverviewStatisticsAirlines
} from "../controller/statistics.controller";

const router = Router()

router.route("/").get(getDashboardStatistics)
router.route("/airlines").get(getOverviewStatisticsAirlines)
router.route("/overview").get(getOverviewStatistics)

export default router
