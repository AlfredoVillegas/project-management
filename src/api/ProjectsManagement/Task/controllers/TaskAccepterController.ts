import { Request, Response } from 'express';
import { TaskAccepter } from '../../../../modules/ProjectsManagement/Tasks/application/TaskAccepter';
import { TaskNotExist } from '../../../../modules/ProjectsManagement/Tasks/domain/Errors';
import { responseError, responseSuccess } from '../../../shared/network/response';

export class TaskAccepterController {
  constructor(private taskAccepterService: TaskAccepter) {}

  async execute(req: Request, res: Response) {
    const collaboratorId = req.user;
    const taskId = req.params.id;

    try {
      await this.taskAccepterService.execute(taskId, collaboratorId);
      responseSuccess(res, 200);
    } catch (error) {
      if (error instanceof TaskNotExist) {
        return responseError(res, 404, error.message);
      }
      responseError(res);
    }
  }
}
