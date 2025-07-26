import {Request, Response} from 'express';
import {ErrorApi} from '../lib/errorHandler';
import asyncHandler from "../lib/asyncHandler";
import {UserModel} from "../model/user.model";
import {UpdateProfileSchema} from "../validation/auth.schema";

// Update user profile (name, email)
export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const { name, email } = UpdateProfileSchema.parse(req.body);
  const user = await UserModel.findByIdAndUpdate(
    req.user.id,
    { name, email },
    { new: true }
  );
  if (!user) throw new ErrorApi(404, 'User not found');
  res.status(200).json(user);
});

// Change user password
export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password || password.length < 8) throw new ErrorApi(400, 'Password must be at least 8 characters');
  const user = await UserModel.findById(req.user.id);
  if (!user) throw new ErrorApi(404, 'User not found');
  user.password = password; // Hash before saving in production
  await user.save();
  res.status(200).json({ message: 'Password updated' });
});

// Change user avatar photo
export const changePhoto = asyncHandler(async (req: Request, res: Response) => {
  console.log(req)

  res.status(200).json({});
});

