import {z} from "zod";


export const PaymentSchema = z.object({
transactionId:z.string(),
accountNumber:z.number(),
package:z.enum(["YEARLY", "MONTHLY"])
})


export const CreatePaymentSchema = z.object({
    amount: z.number().min(1, "Amount must be greater than 0"),
    currency: z.string().min(1, "Currency is required").default("usd"),
    payment_method_types: z.string().array().min(1, "Payment method is required").default(["card"]),
})