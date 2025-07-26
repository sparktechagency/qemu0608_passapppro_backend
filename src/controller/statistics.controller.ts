import asyncHandler from "../lib/asyncHandler";
import {AirlinesModel} from "../model/airlines.model";
import {SubmissionModel} from "../model/submission.model";
import {statisticOverviewSchema} from "../validation/statistic.schema";


export const getDashboardStatistics = asyncHandler(async (req, res) => {

    const [
        totalSubmissions,
        passedSubmissions,
        failedSubmissions,
        totalAirlines
    ] = await Promise.all([

        SubmissionModel.countDocuments(),

        SubmissionModel.countDocuments({assessmentStatus: "PASS"}),

        SubmissionModel.countDocuments({assessmentStatus: "FAIL"}),

        AirlinesModel.countDocuments(),
    ])


    res.status(200).json({
        totalSubmissions,
        passedSubmissions,
        failedSubmissions,
        totalAirlines,
    })
})

export const getOverviewStatistics = asyncHandler(async (req, res) => {
    const { name, date } = statisticOverviewSchema.parse(req.body);

    // If `date` is a string, convert to Date object
    const parsedDate = new Date(date);

    // Calculate start and end of the month
    const start = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1);
    const end = new Date(parsedDate.getFullYear(), parsedDate.getMonth() + 1, 1);

    const submissions = await SubmissionModel.find({
        selectedAirline: name,
        selectedYear: {
            $gte: start,
            $lt: end,
        },
    });

    res.json({ count: submissions.length, submissions });
});
