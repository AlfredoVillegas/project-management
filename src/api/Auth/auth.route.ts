import { Request, Response, Router } from 'express';
import container from '../shared/dependency-injection';
import { indexController } from './controllers/indexController';
import { LoginGithubController } from './controllers/loginGithubController';

export const registerAuthRoutes = (router: Router) => {
  router.get('/', (req: Request, res: Response) => indexController(req, res));

  const loginController = new LoginGithubController();
  router.get(`/auth/users/callback/`, (req: Request, res: Response) => loginController.execute(req, res));

  const registerController = container.get('Api.Auth.controllers.RegisterWhitGithubController');
  router.get(`/auth/users/callback/signin`, (req: Request, res: Response) => registerController.execute(req, res));
};
