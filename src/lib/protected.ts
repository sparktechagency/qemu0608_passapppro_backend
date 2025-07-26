import {NextFunction, Request, Response} from "express";
import {JWT} from "./jwt";
import {User, UserModel} from "../model/user.model";
import {ErrorApi} from "./errorHandler";


declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

export const Protected = async (req:Request, res: Response, next: NextFunction) => {
    const token = req.cookies["access-token"]
    if (!token) {
        return new ErrorApi(401, "unauthorized");
    }
    const decodedPayload = JWT.verifyAccessToken(token);

    const user = await UserModel.findById(decodedPayload.id)
    if (!user) {
        return new ErrorApi(401, "unauthorized");
    }
    req.user = user;
    next()
}