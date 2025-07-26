import {Document, model, Schema} from "mongoose";

export enum Package {
    YEARLY = "YEARLY",
    MONTHLY = "MONTHLY",
}

export interface Payment extends Document {
    transactionId: string;
    accountNumber: string;
    package: string;
}

const paymentSchema: Schema<Payment> = new Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    package: {
        type: String,
        required: true,
        enum: Package
    }
})

export const PaymentModel = model<Payment>("Payment", paymentSchema)