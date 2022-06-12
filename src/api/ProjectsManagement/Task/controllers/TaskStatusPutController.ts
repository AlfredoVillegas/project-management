import { Request, Response } from 'express';
import { TaskStatusUpdater } from '../../../../modules/ProjectsManagement/Tasks/application/TaskStatusUpdater';
import { TaskNotExist } from '../../../../modules/ProjectsManagement/Tasks/domain/Errors';
import { InvalidArgumentError } from '../../../../modules/Shared/domain/value-object/InvalidArgumentError';
import { responseError, responseSuccess } from '../../../shared/network/response';

export class TaskStatusPutController {
  constructor(private statusUpdaterService: TaskStatusUpdater) {}

  async execute(req: Request, res: Response) {
    const collaboratorId = req.user;
    const taskId = req.params.id;
    const status = req.body.status;
    try {
      await this.statusUpdaterService.execute(taskId, collaboratorId, status);
      responseSuccess(res, 200);
    } catch (error) {
      if (error instanceof TaskNotExist || error instanceof InvalidArgumentError) {
        return responseError(res, 404, error.message);
      }
      responseError(res);
    }
  }
}
