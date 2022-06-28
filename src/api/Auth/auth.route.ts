import { Request, Response, Router } from 'express';
import container from '../shared/dependency-injection';
import { indexController } from './controllers/indexController';
import { LoginGithubController } from './controllers/loginGithubController';
import { RegisterWhitGithubController } from './controllers/registerWhitGithubController';

export const registerAuthRoutes = (router: Router) => {
  router.get('/', (req: Request, res: Response) => indexController(req, res));

  const loginController: LoginGithubController = container.get('Api.Auth.controllers.LoginGithubController');
  router.get(`/auth/users/callback/`, (req: Request, res: Response) => loginController.execute(req, res));

  const registerController: RegisterWhitGithubController = container.get(
    'Api.Auth.controllers.RegisterWhitGithubController'
  );
  router.get(`/auth/users/callback/signup`, (req: Request, res: Response) => registerController.execute(req, res));
};
