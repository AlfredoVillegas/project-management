import { Request, Response } from 'express';
import { TaskCreator } from '../../../../modules/ProjectsManagement/Tasks/application/TaskCreator';
import { responseError, responseSuccess } from '../../../shared/network/response';
import { UUID_STRING } from '../../../shared/types';

export interface TaskPostBody {
  id: UUID_STRING;
  name: string;
  description: string;
  projectId: UUID_STRING;
}

export class TaskPostController {
  constructor(private taskCreatorService: TaskCreator) {}

  async execute(req: Request, res: Response) {
    try {
      const { id, name, description, projectId } = req.body as TaskPostBody;

      await this.taskCreatorService.execute({ id, name, description, projectId });

      responseSuccess(res, 201);
    } catch (error) {
      responseError(res);
    }
  }
}
