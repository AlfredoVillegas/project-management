import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { responseError } from '../../shared/network/response';
import { TokenPayload } from '../services/createToken';

export function verifyAuthToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.get('authorization');

    const token = authorization && authorization.toLowerCase().startsWith('bearer') ? authorization.substring(7) : null;

    const decodedToken = token ? (jwt.verify(token, process.env.SECRET_KEY || 'dev') as TokenPayload) : null;

    if (!decodedToken || !decodedToken.id) {
      return responseError(res, 401, 'token missing or invalid');
    }
    //req.params.userAuth = decodedToken.id;
    req.user = decodedToken.id;
    next();
  } catch (err: any) {
    responseError(res, 401, 'token missing or invalid');
  }
}
