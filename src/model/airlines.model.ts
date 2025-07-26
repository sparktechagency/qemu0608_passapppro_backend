import {Document, model, Schema} from 'mongoose'

export interface Airlines extends Document{
    name: string;
}

const AuthSchema: Schema<Airlines> = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
})

export const AirlinesModel = model<Airlines>('Airlines', AuthSchema)