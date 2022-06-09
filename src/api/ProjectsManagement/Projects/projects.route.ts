import { NextFunction, Request, Response, Router } from 'express';
import { verifyAuthToken } from '../../Auth/middelwares/VerifyAuthToken';
import container from '../../shared/dependency-injection';

export const registerProjectsRoutes = (router: Router) => {
  router.use('/projects', (req: Request, res: Response, next: NextFunction) => verifyAuthToken(req, res, next));

  const projectPostController = container.get('Api.ProjectsManagement.controllers.ProjectPostController');
  router.post(`/projects`, (req: Request, res: Response) => projectPostController.execute(req, res));

  const addCollaboratorsController = container.get('Api.ProjectsManagement.controllers.AddCollaboratorsController');
  router.post(`/projects/collaborators`, (req: Request, res: Response) => addCollaboratorsController.execute(req, res));

  const projectsByMemberGetController = container.get(
    'Api.ProjectsManagement.controllers.ProjectsByMemberGetController'
  );
  router.get(`/projects/by-member`, (req: Request, res: Response) => projectsByMemberGetController.execute(req, res));
};
