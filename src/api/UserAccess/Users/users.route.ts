import { NextFunction, Request, Response, Router } from 'express';
import { verifyAuthToken } from '../../Auth/middelwares/VerifyAuthToken';
import container from '../../shared/dependency-injection';

export const registerUsersRoutes = (router: Router) => {
  const userGetController = container.get('Api.Users.controllers.UserGetController');
  router.get(
    `/users/me`,
    (req: Request, res: Response, next: NextFunction) => verifyAuthToken(req, res, next),
    (req: Request, res: Response) => userGetController.execute(req, res)
  );

  const userDeleteController = container.get('Api.Users.controllers.UserDeleterController');
  router.delete(
    `/users/me`,
    (req: Request, res: Response, next: NextFunction) => verifyAuthToken(req, res, next),
    (req: Request, res: Response) => userDeleteController.execute(req, res)
  );
};
