import { Request, Response } from 'express';
import { ChecklistDeleter } from '../../../../modules/ProjectsManagement/CheckLists/application/ChecklistDeleter';
import { domainErrorHandler } from '../../../shared/domainErrorsHandler';
import { checklistsErrorsHandlerMap } from '../checklistErrorsHandler';

export class ChecklistDeleteController {
  constructor(private checklistDeleter: ChecklistDeleter) {}

  async execute(req: Request, res: Response) {
    const { checklistId } = req.params;

    try {
      await this.checklistDeleter.execute(checklistId);
      res.status(201).send();
    } catch (error: any) {
      domainErrorHandler(res, error, checklistsErrorsHandlerMap);
    }
  }
}
