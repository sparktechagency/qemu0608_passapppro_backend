import asyncHandler from "../lib/asyncHandler";
import {SubmissionSchema} from "../validation/submission.schema";
import {SubmissionModel} from "../model/submission.model";
import {ErrorApi} from "../lib/errorHandler";

export const searchSubmission = asyncHandler(async (req, res) => {
    const {airline} = req.query
    if (!airline) {
        throw new ErrorApi(400, "Airlines name is required for search");
    }
    const submission = await SubmissionModel
        .find({ selectedAirline: airline })
        .exec();
    res.status(200).json(submission);
});


export const getSubmission = asyncHandler(async (req,res) => {
    const users = await SubmissionModel.find()
    res.status(200).json(users)
})

export const createSubmission  = asyncHandler(async (req, res) => {

        const {deviceId, submissionTime, selectedAirline, selectedYear, assessmentStatus} = SubmissionSchema.parse(req.body)

        const submission =await SubmissionModel.create({
            deviceId,
            submissionTime,
            selectedAirline,
            selectedYear,
            assessmentStatus,
        })

        res.status(200).json(submission)
})

export const deleteSubmission  = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id
        const submission = await SubmissionModel.findByIdAndDelete(id)

        res.status(200).json(submission)
    }catch (error: any) {
        console.log(error)
        throw new ErrorApi(500, error.message)
    }
})

