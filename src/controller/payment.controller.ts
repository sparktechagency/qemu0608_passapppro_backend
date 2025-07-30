import {Request, Response} from 'express';
import {ErrorApi} from "../lib/errorHandler";
import {PaymentModel} from "../model/payment.model";
import asyncHandler from "../lib/asyncHandler";
import {CreatePaymentSchema} from "../validation/payment.schema";
import stripe from "../service/stripe";

export const searchPayment = asyncHandler(async (req: Request, res: Response) => {
    const {query} = req.query;
    if (!query) {
        throw new ErrorApi(400, "Query is required for search");
    }

    const payments = await PaymentModel
        .find({
            $or:[
                { transactionId: { $regex: query, $options: 'i' } },
                {accountNumber: { $regex: Number(query), $options: 'i' } },
            ]
        })
        .exec();
    res.status(200).json(payments);
})

// Create a new payment
export const createPayment = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body
    const payment = await PaymentModel.create(body);
    if (!payment) throw new ErrorApi(400, 'Payment not created');
    res.status(201).json(payment);
});

// Get all payments
export const getAllPayments = asyncHandler(async (req: Request, res: Response) => {
    const payments = await PaymentModel.find();
    res.status(200).json(payments);
});

// Get payment by ID
export const getPaymentById = asyncHandler(async (req: Request, res: Response) => {
    const payment = await PaymentModel.findById(req.params.id);
    if (!payment) throw new ErrorApi(404, 'Payment not found');
    res.status(200).json(payment);
});

// Delete payment by ID
export const deletePayment = asyncHandler(async (req: Request, res: Response) => {
    const payment = await PaymentModel.findByIdAndDelete(req.params.id);
    if (!payment) throw new ErrorApi(400, 'Payment not deleted');
    res.status(200).json({ message: 'Payment deleted' });
});

export const createPaymentIntent = asyncHandler(async (req: Request, res: Response) => {
try {
    const {payment_method_types, currency, amount} = CreatePaymentSchema.parse(req.body)

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types
    })

    res.status(200).json({
        clientSecret: paymentIntent.client_secret
    })
} catch (error) {
    console.error('Error creating payment intent:', error);
    throw new ErrorApi(500, 'Failed to create payment intent');
}
})


export const paymentWebhook = asyncHandler(async (req: Request, res: Response) => {

    const signingSecret = "we_1RplzVFcNUJeEvBZWAijLYzr"

    return res.status(200).json({ message: 'Webhook received'});
})
