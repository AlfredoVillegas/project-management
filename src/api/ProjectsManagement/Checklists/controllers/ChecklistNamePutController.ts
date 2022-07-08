import { Request, Response } from 'express';
import { ChecklistRenamer } from '../../../../modules/ProjectsManagement/CheckLists/application/Update/ChecklistRenamer';
import { domainErrorHandler } from '../../../shared/domainErrorsHandler';
import { checklistsErrorsHandlerMap } from '../checklistErrorsHandler';

export class ChecklistNamePutController {
  constructor(private renamer: ChecklistRenamer) {}

  async execute(req: Request, res: Response) {
    const { checklistId } = req.params;
    const { name } = req.body;

    try {
      await this.renamer.execute(checklistId, name);
      res.status(200).send();
    } catch (error: any) {
      domainErrorHandler(res, error, checklistsErrorsHandlerMap);
    }
  }
}
