import asyncHandler from "../lib/asyncHandler";
import {MongooseError} from "mongoose";
import {Request, Response} from "express";
import {ErrorApi} from "../lib/errorHandler";
import {AssessmentModel} from "../model/assesment.model";

export const searchAssessment = asyncHandler(async (req: Request, res: Response) => {
    const {assessment} = req.query;
    if (!assessment) {
        throw new ErrorApi(400, "Assessment name is required for search");
    }
    const result = await AssessmentModel
        .find({ name: { $regex: assessment, $options: 'i' } })
        .exec();
    res.status(200).json(result);
});


export const getAssessment = asyncHandler(async (req: Request, res: Response) => {
    try {
        const airline = await AssessmentModel.findById(req.params.id);
        if (!airline) return res.status(404).json({ error: 'Assessment not found' });
        res.status(200).json(airline);
    } catch (error) {
        if (error instanceof MongooseError) throw new ErrorApi(400, error.message)
        else res.status(500).json({ error: 'An unexpected error occurred' });
    }
})

export const getAssessments = asyncHandler(async (req: Request, res: Response) => {
  try {
    const airlines = await AssessmentModel.find();
    res.status(200).json(airlines);
  } catch (error) {
    if (error instanceof MongooseError) throw new ErrorApi(400, error.message)
    else res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

export const createAssessment = asyncHandler(async (req: Request, res: Response) => {
  try {
      const { name } = req.body;
      if (!name) throw new ErrorApi(400,  'Assessment name is required' )

    const airline = await AssessmentModel.create({
      name
    });

    res.status(201).json(airline);
  } catch (error) {
    if (error instanceof MongooseError) throw new ErrorApi(400, error.message)
    else res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// Update an airline by ID
export const updateAssessment = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) throw new ErrorApi(400,  'Assessment name is required' )

    const airline = await AssessmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!airline) return res.status(404).json({ error: 'Assessment not found' });
    res.status(200).json(airline);
  } catch (error) {
      console.log(error)
    if (error instanceof MongooseError) throw new ErrorApi(400, error.message)
    else res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// Delete an airline by ID
export const deleteAssessment = asyncHandler(async (req: Request, res: Response) => {
  try {
    const airline = await AssessmentModel.findByIdAndDelete(req.params.id);
    if (!airline) return res.status(404).json({ error: 'Assessment not found' });
    res.status(200).json({ message: 'Assessment deleted' });
  } catch (error) {
    if (error instanceof MongooseError) throw new ErrorApi(400, error.message)
    else throw new ErrorApi(500, 'An unexpected error occurred')
  }
});