import { NextFunction, Request, Response, Router } from 'express';
import { verifyAuthToken } from '../Auth/middelwares/VerifyAuthToken';
import container from '../shared/dependency-injection';

export const registerUsersRoutes = (router: Router) => {
  const userDeleterController = container.get('Api.Users.controllers.UserDeleterController');
  router.delete(
    `/users`,
    (req: Request, res: Response, next: NextFunction) => verifyAuthToken(req, res, next),
    (req: Request, res: Response) => userDeleterController.execute(req, res)
  );
};
