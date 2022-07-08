import { Response } from 'express';
import { InvalidArgumentError } from '../../modules/Shared/domain/value-object/InvalidArgumentError';
import { responseError } from './network/response';

export function domainErrorHandler(res: Response, error: Error, errorsHandlerMap: { [key: string]: Function }) {
  if (error instanceof InvalidArgumentError) {
    return responseError(res, 400, error.message);
  }

  const handlerResponseError = errorsHandlerMap[error.name];

  if (!handlerResponseError) throw error;

  handlerResponseError(error, res);
}
