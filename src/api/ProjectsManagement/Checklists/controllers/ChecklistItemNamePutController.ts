import { Request, Response } from 'express';
import { ChecklistItemRenamer } from '../../../../modules/ProjectsManagement/CheckLists/application/Update/ChecklistItemRenamer';
import { domainErrorHandler } from '../../../shared/domainErrorsHandler';
import { checklistsErrorsHandlerMap } from '../checklistErrorsHandler';

export class ChecklistItemNamePutController {
  constructor(private itemRenamer: ChecklistItemRenamer) {}

  async execute(req: Request, res: Response) {
    const { checklistId, checklistItemId } = req.params;
    const { name } = req.body;

    try {
      await this.itemRenamer.execute(checklistId, checklistItemId, name);
      res.status(200).send();
    } catch (error: any) {
      domainErrorHandler(res, error, checklistsErrorsHandlerMap);
    }
  }
}
