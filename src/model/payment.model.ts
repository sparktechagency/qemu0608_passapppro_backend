import {Document, model, Schema} from "mongoose";

export enum Package {
    YEARLY = "YEARLY",
    MONTHLY = "MONTHLY",
}

export interface Payment extends Document {
    transactionId: string;
    accountNumber: number;
    package: string;
}

const paymentSchema: Schema<Payment> = new Schema({
    transactionId: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: Number,
        required: true,
    },
    package: {
        type: String,
        required: true,
        enum: Package
    }
})

export const PaymentModel = model<Payment>("Payment", paymentSchema)