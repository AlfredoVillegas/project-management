import { NextFunction, Request, Response, Router } from 'express';
import { verifyAuthToken } from '../../Auth/middelwares/VerifyAuthToken';
import container from '../../shared/dependency-injection';
import { TaskAccepterController } from './controllers/TaskAccepterController';

export const registerTasksRoutes = (router: Router) => {
  router.use('/tasks', (req: Request, res: Response, next: NextFunction) => verifyAuthToken(req, res, next));

  const taskPostController = container.get('Api.ProjectsManagement.controllers.TaskPostController');
  router.post(`/tasks`, (req: Request, res: Response) => taskPostController.execute(req, res));

  const taskAccepterController: TaskAccepterController = container.get(
    'Api.ProjectsManagement.controllers.TaskAccepterController'
  );
  router.put(`/tasks/accept/:id`, (req: Request, res: Response) => taskAccepterController.execute(req, res));

  const taskStatusPutController = container.get('Api.ProjectsManagement.controllers.TaskStatusPutController');
  router.put(`/tasks/status/:id`, (req: Request, res: Response) => taskStatusPutController.execute(req, res));

  const tasksByProjectGetController = container.get('Api.ProjectsManagement.controllers.TasksByPojectGetController');
  router.get(`/tasks/:projectId`, (req: Request, res: Response) => tasksByProjectGetController.execute(req, res));
};
