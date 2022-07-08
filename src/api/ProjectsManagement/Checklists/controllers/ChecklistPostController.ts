import { Request, Response } from 'express';
import {
  ChecklistCreator,
  ChecklistCreatorParams
} from '../../../../modules/ProjectsManagement/CheckLists/application/ChecklistCreator';
import { domainErrorHandler } from '../../../shared/domainErrorsHandler';
import { checklistsErrorsHandlerMap } from '../checklistErrorsHandler';

export class ChecklistPostController {
  constructor(private checklistCreator: ChecklistCreator) {}

  async execute(req: Request, res: Response) {
    try {
      const { id, name, taskId, items } = req.body as ChecklistCreatorParams;

      await this.checklistCreator.execute({ id, name, taskId, items });

      res.status(201).send();
    } catch (error: any) {
      domainErrorHandler(res, error, checklistsErrorsHandlerMap);
    }
  }
}
