import asyncHandler from "../lib/asyncHandler";
import {AirlinesModel} from "../model/airlines.model";
import {MongooseError} from "mongoose";
import {Request, Response} from "express";
import {ErrorApi} from "../lib/errorHandler";

export const getAirline = asyncHandler(async (req: Request, res: Response) => {
    try {
        const airline = await AirlinesModel.findById(req.params.id);
        if (!airline) return res.status(404).json({ error: 'Airline not found' });
        res.status(200).json(airline);
    } catch (error) {
        if (error instanceof MongooseError) throw new ErrorApi(400, error.message)
        else res.status(500).json({ error: 'An unexpected error occurred' });
    }
})

export const getAirlines = asyncHandler(async (req: Request, res: Response) => {
  try {
    const airlines = await AirlinesModel.find();
    res.status(200).json(airlines);
  } catch (error) {
    if (error instanceof MongooseError) throw new ErrorApi(400, error.message)
    else res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

export const createAirline = asyncHandler(async (req: Request, res: Response) => {
  try {
      const { AirlineName } = req.body;
      if (!AirlineName) throw new ErrorApi(400,  'Airline name is required' )

    const airline = await AirlinesModel.create({
      AirlineName
    });

    res.status(201).json(airline);
  } catch (error) {
    if (error instanceof MongooseError) throw new ErrorApi(400, error.message)
    else res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// Update an airline by ID
export const updateAirline = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { AirlineName } = req.body;
    if (!AirlineName) throw new ErrorApi(400,  'Airline name is required' )

    const airline = await AirlinesModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!airline) return res.status(404).json({ error: 'Airline not found' });
    res.status(200).json(airline);
  } catch (error) {
    if (error instanceof MongooseError) throw new ErrorApi(400, error.message)
    else res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// Delete an airline by ID
export const deleteAirline = asyncHandler(async (req: Request, res: Response) => {
  try {
    const airline = await AirlinesModel.findByIdAndDelete(req.params.id);
    if (!airline) return res.status(404).json({ error: 'Airline not found' });
    res.status(200).json({ message: 'Airline deleted' });
  } catch (error) {
    if (error instanceof MongooseError) throw new ErrorApi(400, error.message)
    else throw new ErrorApi(500, 'An unexpected error occurred')
  }
});