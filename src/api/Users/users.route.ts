import { Request, Response, Router } from 'express';
import container from '../shared/dependency-injection';

export const registerUsersRoutes = (router: Router) => {
  const userDeleterController = container.get('Api.Users.controllers.UserDeleterController');
  router.delete(`/users`, (req: Request, res: Response) => userDeleterController.execute(req, res));
};
