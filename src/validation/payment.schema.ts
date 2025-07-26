import {z} from "zod";


export const PaymentSchema = z.object({
transactionId:z.string(),
accountNumber:z.number(),
package:z.enum(["YEARLY", "MONTHLY"])
})