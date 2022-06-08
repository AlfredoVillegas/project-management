import { Request, Response, Router } from 'express';
import container from '../../shared/dependency-injection';
import { TaskAccepterController } from './controllers/TaskAccepterController';

export const registerTasksRoutes = (router: Router) => {
  const taskPostController = container.get('Api.ProjectsManagement.controllers.TaskPostController');
  router.post(`/tasks`, (req: Request, res: Response) => taskPostController.execute(req, res));

  const taskAccepterController: TaskAccepterController = container.get(
    'Api.ProjectsManagement.controllers.TaskAccepterController'
  );
  router.put(`/tasks/accept/:id`, (req: Request, res: Response) => taskAccepterController.execute(req, res));

  const taskStatusPutController = container.get('Api.ProjectsManagement.controllers.TaskStatusPutController');
  router.put(`/tasks/update-status/:id`, (req: Request, res: Response) => taskStatusPutController.execute(req, res));

  const tasksByProjectGetController = container.get('Api.ProjectsManagement.controllers.TasksByPojectGetController');
  router.get(`/tasks/:project_id`, (req: Request, res: Response) => tasksByProjectGetController.execute(req, res));
};
