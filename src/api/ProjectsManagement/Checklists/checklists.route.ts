import { NextFunction, Request, Response, Router } from 'express';
import { verifyAuthToken } from '../../Auth/middelwares/VerifyAuthToken';
import container from '../../shared/dependency-injection';
import { ChecklistPostController } from './controllers/ChecklistPostController';

export const registerChecklistsRoutes = (router: Router) => {
  router.use('/checklists', (req: Request, res: Response, next: NextFunction) => verifyAuthToken(req, res, next));

  const checklistPostController: ChecklistPostController = container.get(
    'Api.ProjectsManagement.controllers.ChecklistPostController'
  );
  router.post(`/checklists`, (req: Request, res: Response) => checklistPostController.execute(req, res));

  const checklistItemPostController = container.get('Api.ProjectsManagement.controllers.ChecklistItemPostController');
  router.post(`/checklists/:checklistId/checklist-item`, (req: Request, res: Response) =>
    checklistItemPostController.execute(req, res)
  );

  const checklistItemIsVerifiedPutController = container.get(
    'Api.ProjectsManagement.controllers.ChecklistItemIsVerifiedPutController'
  );
  router.put(`/checklists/:checklistId/checklist-item/:checklistItemId/is-verified`, (req: Request, res: Response) =>
    checklistItemIsVerifiedPutController.execute(req, res)
  );

  const checklistNamePutController = container.get('Api.ProjectsManagement.controllers.ChecklistNamePutController');
  router.put(`/checklists/:checklistId/name`, (req: Request, res: Response) =>
    checklistNamePutController.execute(req, res)
  );

  const checklistItemNamePutController = container.get(
    'Api.ProjectsManagement.controllers.ChecklistItemNamePutController'
  );
  router.put(`/checklists/:checklistId/checklist-item/:checklistItemId/name`, (req: Request, res: Response) =>
    checklistItemNamePutController.execute(req, res)
  );

  const checklistsByTaskGetController = container.get(
    'Api.ProjectsManagement.controllers.ChecklistsByTaskGetController'
  );
  router.get('/checklists/:taskId/', (req: Request, res: Response) => checklistsByTaskGetController.execute(req, res));

  const checklistDeleteController = container.get('Api.ProjectsManagement.controllers.ChecklistDeleteController');
  router.delete('/checklists/:checklistId', (req: Request, res: Response) =>
    checklistDeleteController.execute(req, res)
  );

  const checklistItemDeleteController = container.get(
    'Api.ProjectsManagement.controllers.ChecklistItemDeleteController'
  );
  router.delete('/checklists/:checklistId/checklist-item/:checklistItemId', (req: Request, res: Response) =>
    checklistItemDeleteController.execute(req, res)
  );
};
