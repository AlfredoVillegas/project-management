import { Request, Response } from 'express';
import { ProjectCreator } from '../../../../modules/ProjectsManagement/Projects/application/ProjectCreator';
import { responseError } from '../../../shared/network/response';
/*
type ProjectPostRequest = Request & {
  body: {
    id: string;
    name: string;
    description: string;
    creator: string;
    collaboratorsIds?: string[];
  };
};*/

export class ProjectPostController {
  constructor(private projectCreator: ProjectCreator) {}

  async execute(req: Request, res: Response) {
    try {
      const creator = 'e0fc7962-a18f-4961-9cbe-b28e8b4e1d51'; // req.user;
      const { id, description, name, collaboratorsIds } = req.body;

      await this.projectCreator.execute({ creator, description, id, name, collaboratorsIds });

      res.status(201).send();
    } catch (error: any) {
      responseError(res, 400, error.message);
    }
  }
}
