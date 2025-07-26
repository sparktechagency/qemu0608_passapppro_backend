import {Router} from "express";
import {
    createAirline,
    deleteAirline,
    getAirline,
    getAirlines,
    searchAirlines,
    updateAirline
} from "../controller/airlines.controller";

const router = Router()

router.route("/search").get(searchAirlines)
router.route("/:id").get(getAirline)
router.route("/").get(getAirlines)
router.route("/").post(createAirline)
router.route("/:id").put(updateAirline)
router.route("/:id").delete(deleteAirline)

export default router
