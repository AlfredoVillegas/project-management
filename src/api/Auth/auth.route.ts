import { Request, Response, Router } from 'express';
import { LoginGithubController } from './controllers/loginGithubController';

export const registerAuthRouters = (router: Router) => {
  const loginController = new LoginGithubController();
  router.get(`/user/signin/callback`, (req: Request, res: Response) => loginController.execute(req, res));

  //const registerController = new RegisterWhitGithubController();
  //router.get(`/user/signin/callback/register`, (req: Request, res: Response) => registerController.execute(req, res));
};
