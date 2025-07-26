import {Document, model, Schema} from 'mongoose';

export enum AssessmentStatus {
    PASS = "PASS",
    FAIL = "FAIL",
}

interface Submission extends Document{
    deviceId: string;
    submissionTime: Date;
    selectedAirline: string;
    selectedYear: Date;
    assessmentStatus: AssessmentStatus;
}

const submissionSchema: Schema<Submission> = new Schema({
    deviceId: {
        type: String,
        required: true,
    },
    submissionTime: {
        type: Date,
        default: Date.now
    },
    selectedAirline: {
        type: String,
        required: true,
        index: true,
    },
    selectedYear: {
        type: Date,
        required: true,
    },
    assessmentStatus: {
        type: String,
        enum: AssessmentStatus,
        required: true,
    }
}, {
    timestamps: true,
})

export const SubmissionModel = model<Submission>('Submission', submissionSchema);