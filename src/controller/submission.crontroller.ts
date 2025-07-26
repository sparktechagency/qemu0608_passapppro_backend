import asyncHandler from "../lib/asyncHandler";
import {SubmissionSchema} from "../validation/submission.schema";
import {SubmissionModel} from "../model/submission.model";
import {ErrorApi} from "../lib/errorHandler";


export const getSubmission = asyncHandler(async () => {
    const submissions = await SubmissionModel.find()
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
        const deviceId = req.params.id
        const submission = await SubmissionModel.findOneAndDelete({
            deviceId,
        })

        res.status(200).json(submission)
    }catch (error: any) {
        console.log(error)
        throw new ErrorApi(500, error.message)
    }
})

