import { Response } from 'express';
import { responseError } from '../../shared/network/response';

export const checklistsErrorsHandlerMap: { [key: string]: Function } = {
  ChecklistNotExist: (err: Error, res: Response) => {
    responseError(res, 404, err.message);
  },
  ChecklistItemNotFound: (err: Error, res: Response) => {
    responseError(res, 404, err.message);
  },
  ChecklistItemAlreadyIsVerified: (err: Error, res: Response) => {
    responseError(res, 400, err.message);
  },
  TaskHasNotChecklists: (err: Error, res: Response) => {
    responseError(res, 404, err.message);
  }
};
