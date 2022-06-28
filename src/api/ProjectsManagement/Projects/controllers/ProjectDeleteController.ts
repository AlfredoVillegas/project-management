import { Request, Response } from 'express';
import { ProjectDeleter } from '../../../../modules/ProjectsManagement/Projects/application/ProjectDeleter';
import { NotHaveCreatePermission } from '../../../../modules/ProjectsManagement/Projects/domain/Errors';
import { responseError } from '../../../shared/network/response';

export class ProjectDeleteController {
  constructor(private projectDeleter: ProjectDeleter) {}

  async execute(req: Request, res: Response) {
    const userId = req.user;
    const projectId = req.params.projectId;

    try {
      await this.projectDeleter.execute(projectId, userId);
      res.status(201).send();
    } catch (error) {
      if (error instanceof NotHaveCreatePermission) {
        return responseError(res, 401, error.message);
      }
      responseError(res);
    }
  }
}
