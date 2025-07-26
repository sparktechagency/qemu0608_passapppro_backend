import {Document, model, Schema} from 'mongoose'

export interface Airlines extends Document{
    AirlineName: string;
}

const AuthSchema: Schema<Airlines> = new Schema({
    AirlineName: {
        type: String,
        required: true,
    }
})

export const AirlinesModel = model<Airlines>('Airlines', AuthSchema)