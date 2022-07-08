import { Request, Response } from 'express';
import { ChecklistItemIsVerifiedUpdater } from '../../../../modules/ProjectsManagement/CheckLists/application/Update/ChecklistItemIsVerifiedUpdater';
import { domainErrorHandler } from '../../../shared/domainErrorsHandler';
import { checklistsErrorsHandlerMap } from '../checklistErrorsHandler';

export interface ChecklistItemIsVerifiedPutBody {
  isVerified: boolean;
}

export class ChecklistItemIsVerifiedPutController {
  constructor(private IsVerifiedUpdater: ChecklistItemIsVerifiedUpdater) {}

  async execute(req: Request, res: Response) {
    const { checklistId, checklistItemId } = req.params;
    const { isVerified } = req.body as ChecklistItemIsVerifiedPutBody;

    try {
      await this.IsVerifiedUpdater.execute(checklistId, checklistItemId, isVerified);
      res.status(200).send();
    } catch (error: any) {
      domainErrorHandler(res, error, checklistsErrorsHandlerMap);
    }
  }
}
