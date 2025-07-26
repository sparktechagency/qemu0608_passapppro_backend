import asyncHandler from "../lib/asyncHandler";
import {AirlinesModel} from "../model/airlines.model";
import {SubmissionModel} from "../model/submission.model";


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

export const getOverviewStatisticsAirlines = asyncHandler(async (req, res) => {
    const { name, date } = req.query;

    // If `date` is a string, convert to Date object
    const parsedDate = new Date(date as string);

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

export const getOverviewStatistics = asyncHandler(async (req, res) => {
    const submissions = await SubmissionModel.aggregate([
  // Group by airline and count total + pass count
  {
    $group: {
      _id: "$selectedAirline",
      total: { $sum: 1 },
      passed: {
        $sum: {
          $cond: [{ $eq: ["$assessmentStatus", "PASS"] }, 1, 0]
        }
      }
    }
  },
  // Project pass rate as a percentage
  {
    $project: {
      _id: 0,
      airline: "$_id",
      total: 1,
      passed: 1,
      passRate: {
        $multiply: [{ $divide: ["$passed", "$total"] }, 100]
      }
    }
  },
  // Sort by highest pass rate
  {
    $sort: { passRate: -1 }
  },
  // Limit to top 5
  {
    $limit: 5
  }
])

    return res.status(200).json({
        message: "Overview statistics fetched successfully",
        data: submissions
    })
})