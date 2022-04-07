import { Response } from 'express';

export function responseSuccess(res: Response, status?: number, dataBody?: any) {
  const statusCode = status || 200;
  const data = dataBody || '';
  res.status(statusCode).json({
    error: false,
    status: statusCode,
    data: data
  });
}

export function responseError(res: Response, status?: number, message?: string) {
  const statusCode = status || 500;
  const mesaggeError = message || 'Internal server error';
  res.status(statusCode).send({
    error: true,
    status: statusCode,
    message: mesaggeError
  });
}
