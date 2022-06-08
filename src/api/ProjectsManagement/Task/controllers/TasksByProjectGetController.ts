import { Request, Response } from 'express';
import { TasksFinderByProject } from '../../../../modules/ProjectsManagement/Tasks/application/Find/TasksFinderByProject';
import { responseError, responseSuccess } from '../../../shared/network/response';

export class TasksByProjectGetController {
  constructor(private finderByProjectService: TasksFinderByProject) {}

  async execute(req: Request, res: Response) {
    const projectId = req.params.project_id;
    try {
      const tasks = await this.finderByProjectService.execute(projectId);
      const taskResponse = tasks.map(task => task.toPrimitives());
      responseSuccess(res, 200, taskResponse);
    } catch (error: any) {
      responseError(res, 404, error.message);
    }
  }
}
