import {Request, Response} from 'express';
import {ErrorApi} from "../lib/errorHandler";
import {PaymentModel} from "../model/payment.model";
import asyncHandler from "../lib/asyncHandler";

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