import { Request, Response } from 'express';
import { TaskCreator } from '../../../../modules/ProjectsManagement/Tasks/application/TaskCreator';
import { responseError, responseSuccess } from '../../../shared/network/response';

export class TaskPostController {
  constructor(private taskCreatorService: TaskCreator) {}

  async execute(req: Request, res: Response) {
    try {
      const { id, name, description, projectId } = req.body;

      await this.taskCreatorService.execute({ id, name, description, projectId });

      responseSuccess(res, 201);
    } catch (error) {
      responseError(res);
    }
  }
}
