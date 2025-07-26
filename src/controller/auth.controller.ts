import AsyncHandler from "../lib/asyncHandler";
import {LoginSchema, SignUpSchema} from "../validation/auth.schema";
import {UserModel} from "../model/user.model";
import bcrypt from "bcryptjs"
import {JWT} from "../lib/jwt";
import {ErrorApi} from "../lib/errorHandler";


export const signUp = AsyncHandler(async (req,res) => {
    const { name, email, password } = SignUpSchema.parse(req.body)

    const user = await UserModel.findOne({email})

    if (user) {
        throw new ErrorApi(409, "User already exists!")
    }
    const hashedPassword =await bcrypt.hash(password, 10)
    const newAccount = await UserModel.create({
        name,
        email, password: hashedPassword})

    const accessToken = JWT.accessTokenGenerator({id: newAccount.id, email: newAccount.email})
    const refreshToken = JWT.refreshTokenGenerator({id: newAccount.id})

    res.cookie("access-token", accessToken)
    res.cookie("refresh-token", refreshToken)

    return res.status(201).json({
        message: "created",
        accessToken,
        refreshToken,
    })

})

export const login = AsyncHandler(async (req,res) => {
    const {email} = LoginSchema.parse(req.body)
    const user = await UserModel.findOne({email})
    if (!user) {
        throw new ErrorApi(404, "User does not exist")
    }

    const accessToken = JWT.accessTokenGenerator({id: user.id, email: user.email})
    const refreshToken = JWT.refreshTokenGenerator({id: user.id})

    res.cookie("access-token", accessToken)
    res.cookie("refresh-token", refreshToken)

    res.status(200).json({
        message: "login successfully",
        accessToken,
        refreshToken,
    })
})

export const logout = AsyncHandler(async (req,res) => {
    res.clearCookie("access-token")
    res.clearCookie("refresh-token")
    res.status(200).json({
        message: "logout successfully",
    })
})

export const refreshToken = AsyncHandler(async (req,res) => {
    const token = (req.cookies["refresh-token"])

    if(!token){
        throw new ErrorApi(409, "unauthorized")
    }

    const decoded = JWT.verifyRefreshToken(token)

    const validUser = await UserModel.findById(decoded.id)
    if (!validUser) {
        throw new ErrorApi(401, "User does not exist")
    }

    const accessToken = JWT.accessTokenGenerator({id: validUser.id, email: validUser.email})
    const refreshToken = JWT.refreshTokenGenerator({id: validUser.id})

    res.cookie("access-token", accessToken)
    res.cookie("refresh-token", refreshToken)

    res.status(200).json({
        message: "token refresh successfully",
        accessToken,
        refreshToken,
    })
})