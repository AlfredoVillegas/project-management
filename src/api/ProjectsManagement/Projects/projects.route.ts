import { Request, Response, Router } from 'express';
import container from '../../shared/dependency-injection';

export const registerProjectsRouter = (router: Router) => {
  const projectPostController = container.get('Api.ProjectsManagement.controllers.ProjectPostController');
  router.post(`/projects`, (req: Request, res: Response) => projectPostController.run(req, res));
};
