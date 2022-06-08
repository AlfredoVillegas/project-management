import { Request, Response } from 'express';
import { AddCollaborators } from '../../../../modules/ProjectsManagement/Projects/application/AddCollaborators';
import { responseError, responseSuccess } from '../../../shared/network/response';

export class AddCollaboratorsController {
  constructor(private addCollaboratorsService: AddCollaborators) {}

  async execute(req: Request, res: Response) {
    const { projectId, collaborators } = req.body;

    try {
      await this.addCollaboratorsService.execute(projectId, collaborators);
      responseSuccess(res, 200);
    } catch (error: any) {
      responseError(res, 400, error.message);
    }
  }
}
