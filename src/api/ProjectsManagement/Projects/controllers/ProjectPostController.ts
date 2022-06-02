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
  constructor(private projectCreator: ProjectCreator) {
    console.log('porjeccttt post controller Construidoooooo ');
  }

  async run(req: Request, res: Response) {
    console.log('porjeccttt post controller');
    try {
      const { id, creator, description, name, collaboratorsIds } = req.body;

      await this.projectCreator.execute({ creator, description, id, name, collaboratorsIds });

      res.status(201).send();
    } catch (error: any) {
      responseError(res, 400, error.message);
    }
  }
}
