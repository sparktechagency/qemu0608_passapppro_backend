import mongoose, {Document, Model, Schema} from 'mongoose';

export interface User extends Document {
    name: string;
    avatar: string;
    email: string;
    password: string;
    refreshToken?: string;
    verificationToken?: string;
}

const UserSchema:Schema<User> = new Schema({
    name: {
        type: String,
        required: true,
    },
    avatar: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    refreshToken: String,
    verificationToken: String,
})

export const UserModel :Model<User>= mongoose.model('User', UserSchema);

