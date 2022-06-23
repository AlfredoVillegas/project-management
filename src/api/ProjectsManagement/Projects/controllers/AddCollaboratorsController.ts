import { Request, Response } from 'express';
import { AddCollaborators } from '../../../../modules/ProjectsManagement/Projects/application/AddCollaborators';
import { responseError, responseSuccess } from '../../../shared/network/response';
import { UUID_STRING } from '../../../shared/types';

export interface AddCollaboratorsRequestBody {
  collaborators: UUID_STRING[];
}

export class AddCollaboratorsController {
  constructor(private addCollaboratorsService: AddCollaborators) {}

  async execute(req: Request, res: Response) {
    const { collaborators } = req.body as AddCollaboratorsRequestBody;
    const projectId = req.params.projectId;

    try {
      await this.addCollaboratorsService.execute(projectId, collaborators);
      responseSuccess(res, 200);
    } catch (error: any) {
      responseError(res, 400, error.message);
    }
  }
}
