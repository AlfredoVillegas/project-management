import { Request, Response } from 'express';
import { TaskDeleter } from '../../../../modules/ProjectsManagement/Tasks/application/TaskDeleter';
import { TaskNotExist } from '../../../../modules/ProjectsManagement/Tasks/domain/Errors';
import { responseError } from '../../../shared/network/response';

export class TaskDeleteController {
  constructor(private taskDeleter: TaskDeleter) {}

  async execute(req: Request, res: Response) {
    const userId = req.user;
    const taskId = req.params.taskId;

    try {
      await this.taskDeleter.execute(taskId);
      res.status(201).send();
    } catch (error) {
      if (error instanceof TaskNotExist) {
        responseError(res, 404, error.message);
      }
      responseError(res);
    }
  }
}
