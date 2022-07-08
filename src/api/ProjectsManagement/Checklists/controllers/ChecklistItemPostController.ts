import { Request, Response } from 'express';
import { ChecklistItemAggregator } from '../../../../modules/ProjectsManagement/CheckLists/application/ChecklistItemAggregator';
import { domainErrorHandler } from '../../../shared/domainErrorsHandler';
import { checklistsErrorsHandlerMap } from '../checklistErrorsHandler';

export interface ChecklistItemPostBody {
  checklistItemId: string;
  name: string;
}

export class ChecklistItemPostController {
  constructor(private checklistItemAggregator: ChecklistItemAggregator) {}

  async execute(req: Request, res: Response) {
    try {
      const { checklistId } = req.params;
      const { checklistItemId, name } = req.body as ChecklistItemPostBody;

      await this.checklistItemAggregator.execute({ checklistId, checklistItemId, name });

      res.status(201).send();
    } catch (error: any) {
      domainErrorHandler(res, error, checklistsErrorsHandlerMap);
    }
  }
}
