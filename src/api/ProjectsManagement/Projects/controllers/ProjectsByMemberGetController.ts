import { Request, Response } from 'express';
import { ProjectsFinderByMember } from '../../../../modules/ProjectsManagement/Projects/application/Find/ProjectsFinderByMember';
import { ProjectNotExist } from '../../../../modules/ProjectsManagement/Projects/domain/ProjectNotExist';
import { responseError, responseSuccess } from '../../../shared/network/response';

export interface ProjectResponse {
  id: string;
  name: string;
  description: string;
  creator: string;
  collaboratorsIds: string[];
}

export class ProjectsByMemberGetController {
  constructor(private finderByMemberService: ProjectsFinderByMember) {}

  async execute(req: Request, res: Response) {
    const menberId = req.user;

    try {
      const projects = await this.finderByMemberService.execute(menberId);

      const projectsResponse = projects.map(project => project.toPrimitives());

      responseSuccess(res, 200, projectsResponse);
    } catch (error) {
      if (error instanceof ProjectNotExist) {
        return responseError(res, 404, 'does not yet have projects or collaborate in one');
      }
      responseError(res, 404);
    }
  }
}
