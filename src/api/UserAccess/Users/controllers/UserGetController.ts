import { Request, Response } from 'express';
import { UserFinderById } from '../../../../modules/UserAccess/Users/application/UserFinderById';
import { UserNotExist } from '../../../../modules/UserAccess/Users/domain/Errors';
import { responseError, responseSuccess } from '../../../shared/network/response';
import { UUID_STRING } from '../../../shared/types';

export interface UserResponse {
  id: UUID_STRING;
  name: string;
  email: string;
}

export class UserGetController {
  constructor(private userFinder: UserFinderById) {}

  async execute(req: Request, res: Response) {
    const userId = req.user;

    try {
      const user = (await this.userFinder.run(userId)).toPrimitives();

      const userResponse: UserResponse = { id: user.id, name: user.name, email: user.email };
      responseSuccess(res, 200, userResponse);
    } catch (error) {
      if (error instanceof UserNotExist) {
        return responseError(res, 404, error.message);
      }
      responseError(res);
    }
  }
}
