import { Request as RequestEx, Response } from 'express';
import { ProjectCreator } from '../../../../modules/ProjectsManagement/Projects/application/ProjectCreator';
import { responseError } from '../../../shared/network/response';
import { UUID_STRING } from '../../../shared/types';

export interface ProjectPostBody {
  id: UUID_STRING;
  name: string;
  collaboratorsIds?: string[];
  description: string;
}

export class ProjectPostController {
  constructor(private projectCreator: ProjectCreator) {}

  async execute(req: RequestEx, res: Response) {
    try {
      const creator = req.user;
      const { id, description, name, collaboratorsIds } = req.body as ProjectPostBody;

      await this.projectCreator.execute({ creator, description, id, name, collaboratorsIds });

      res.status(201).send();
    } catch (error: any) {
      responseError(res, 400, error.message);
    }
  }
}
