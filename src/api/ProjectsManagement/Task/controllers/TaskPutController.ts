import { Request, Response } from 'express';
import { TaskUpdater } from '../../../../modules/ProjectsManagement/Tasks/application/TaskUpdater';
import { TaskNotExist } from '../../../../modules/ProjectsManagement/Tasks/domain/Errors';
import { responseError } from '../../../shared/network/response';

export interface TaskPutBody {
  name?: string;
  description?: string;
}

export class TaskPutController {
  constructor(private updater: TaskUpdater) {}

  async execute(req: Request, res: Response) {
    const taskId = req.params.taskId;
    const { name, description } = req.body as TaskPutBody;

    try {
      await this.updater.execute({ id: taskId, name, description });
      res.status(200).send();
    } catch (error) {
      if (error instanceof TaskNotExist) {
        responseError(res, 404, error.message);
      }
      responseError(res);
    }
  }
}
