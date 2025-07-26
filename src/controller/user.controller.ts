import {Request, Response} from 'express';
import {ErrorApi} from '../lib/errorHandler';
import asyncHandler from "../lib/asyncHandler";
import {UserModel} from "../model/user.model";
import {ChangePasswordSchema, UpdateProfileSchema} from "../validation/auth.schema";
import bcrypt from 'bcryptjs';
import * as fs from "node:fs";

export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.user.id);
    if (!user) throw new ErrorApi(404, 'User not found');

    user.password = "private"
    delete user.refreshToken;

    res.status(200).json(user);
})

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
  const userId = req.user.id;

  const {oldPassword, newPassword} = ChangePasswordSchema.parse(req.body);

  console.log(userId, oldPassword, newPassword)

    const user = await UserModel.findById(userId);

    if (!user) throw new ErrorApi(404, 'User not found');

    console.log(user)
    const isMatch = await bcrypt.compare(oldPassword, user.password)

    if (!isMatch) throw new ErrorApi(400, 'Old password is incorrect');

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await UserModel.findByIdAndUpdate(userId, {
        password: hashedPassword
        }, {
      new: true
    })

  res.status(200).json({ message: 'Password updated' });
});




// Change user avatar photo
export const changePhoto = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file?.filename;
    if (!file) throw new ErrorApi(400, 'No file uploaded');
    const user = await UserModel.findByIdAndUpdate(
        req.user.id,
        { avatar: file }
    );
    if (!user) throw new ErrorApi(404, 'User not found');
    // Remove old avatar file if exists
    if (user.avatar) {
        const oldAvatarPath = `./public/uploads/${user.avatar}`;
        if (fs.existsSync(oldAvatarPath)) {
            fs.unlinkSync(oldAvatarPath);
        }
    }
    res.status(200).json({ avatar: req.file?.filename });
});


