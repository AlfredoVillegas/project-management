import { Body, Get, Path, Post, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { AddCollaboratorsRequestBody } from './controllers/AddCollaboratorsController';
import { ProjectPostBody } from './controllers/ProjectPostController';
import { ProjectResponse } from './controllers/ProjectsByMemberGetController';

@Security('jwt')
@Route('/projects')
@Tags('Projects')
class ProjectsDocsRoutes {
  @SuccessResponse('201', 'Created')
  @Post()
  static projectPostController(@Body() body: ProjectPostBody) {}

  @SuccessResponse('200', 'ok')
  @Post('/{projectId}/collaborators')
  static AddCollaboratorsController(@Body() body: AddCollaboratorsRequestBody, @Path() projectId: string) {}

  @Get('/me')
  static projectsByMemberGetController(): ProjectResponse[] {
    return [];
  }
}
