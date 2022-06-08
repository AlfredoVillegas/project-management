import { Request, Response } from 'express';
import { UserDeleter } from '../../../modules/Users/application/UserDeleter';
import { UserNotExist } from '../../../modules/Users/domain/Errors';
import { responseError, responseSuccess } from '../../shared/network/response';

export class UserDeleterController {
  constructor(private userDeleterService: UserDeleter) {}

  async execute(req: Request, res: Response) {
    const userId = req.user;
    try {
      await this.userDeleterService.run(userId);

      responseSuccess(res, 200);
    } catch (error) {
      if (error instanceof UserNotExist) {
        return responseError(res, 404, error.message);
      }
      responseError(res);
    }
  }
}
