import { Request, Response } from 'express';
import { ChecklistsByTaskIdFinder } from '../../../../modules/ProjectsManagement/CheckLists/application/Find/ChecklistsByTaskIdFinder';
import { domainErrorHandler } from '../../../shared/domainErrorsHandler';
import { responseSuccess } from '../../../shared/network/response';
import { checklistsErrorsHandlerMap } from '../checklistErrorsHandler';

export class ChecklistsByTaskGetController {
  constructor(private checklistByTaskFinder: ChecklistsByTaskIdFinder) {}

  async execute(req: Request, res: Response) {
    const { taskId } = req.params;
    try {
      const checklist = await this.checklistByTaskFinder.execute(taskId);

      responseSuccess(res, 200, checklist);
    } catch (error: any) {
      domainErrorHandler(res, error, checklistsErrorsHandlerMap);
    }
  }
}
