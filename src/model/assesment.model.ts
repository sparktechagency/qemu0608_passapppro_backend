import {Document, model, Schema} from 'mongoose'

export interface Assessment extends Document{
    name: string;
}

const AssessmentSchema: Schema<Assessment> = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
})

export const AssessmentModel = model<Assessment>('Assessment', AssessmentSchema)