import jwt, {JwtPayload} from "jsonwebtoken";
import {JWT_ACCESS_EXPIRY, JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN} from "../config/env.config";

export class JWT {
  static accessTokenGenerator = (payload: JwtPayload, ) => {
    return jwt.sign(payload, JWT_ACCESS_TOKEN, {
      expiresIn: JWT_ACCESS_EXPIRY,

    })
  }

  static refreshTokenGenerator = (payload: JwtPayload, ) => {
    return jwt.sign(payload, JWT_REFRESH_TOKEN, {
      expiresIn: JWT_ACCESS_EXPIRY,
    })
  }

  static verifyAccessToken = (token: string, ) => {
    return jwt.verify(token, JWT_ACCESS_TOKEN) as JwtPayload;
  };

  static verifyRefreshToken = (token: string, ) => {
    return jwt.verify(token, JWT_REFRESH_TOKEN) as JwtPayload;
  };
}
