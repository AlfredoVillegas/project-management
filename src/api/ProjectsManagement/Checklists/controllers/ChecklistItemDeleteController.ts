import { Request, Response } from 'express';
import { ChecklistItemDeleter } from '../../../../modules/ProjectsManagement/CheckLists/application/ChecklistItemDeleter';
import { domainErrorHandler } from '../../../shared/domainErrorsHandler';
import { checklistsErrorsHandlerMap } from '../checklistErrorsHandler';

export class ChecklistItemDeleteController {
  constructor(private itemDeleter: ChecklistItemDeleter) {}

  async execute(req: Request, res: Response) {
    const { checklistId, checklistItemId } = req.params;

    try {
      await this.itemDeleter.execute(checklistId, checklistItemId);
      res.status(200).send();
    } catch (error: any) {
      domainErrorHandler(res, error, checklistsErrorsHandlerMap);
    }
  }
}
