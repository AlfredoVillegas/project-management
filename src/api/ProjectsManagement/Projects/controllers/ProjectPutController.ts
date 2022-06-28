import { Request, Response } from 'express';
import { ProjectUpdater } from '../../../../modules/ProjectsManagement/Projects/application/ProjectUpdater';
import { NotHaveCreatePermission } from '../../../../modules/ProjectsManagement/Projects/domain/Errors';
import { responseError } from '../../../shared/network/response';

export interface ProjectPutBody {
  name?: string;
  description?: string;
}

export class ProjectPutController {
  constructor(private updater: ProjectUpdater) {}

  async execute(req: Request, res: Response) {
    const userId = req.user;
    const projectId = req.params.projectId;
    const { name, description } = req.body as ProjectPutBody;

    try {
      await this.updater.execute(userId, { projectId, name, description });
      res.status(201).send();
    } catch (error) {
      if (error instanceof NotHaveCreatePermission) {
        return responseError(res, 401, error.message);
      }
      responseError(res);
    }
  }
}
