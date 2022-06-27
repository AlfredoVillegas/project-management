import { Body, Delete, Get, Path, Post, Put, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { AddCollaboratorsRequestBody } from './controllers/AddCollaboratorsController';
import { ProjectPostBody } from './controllers/ProjectPostController';
import { ProjectPutBody } from './controllers/ProjectPutController';
import { ProjectResponse } from './controllers/ProjectsByMemberGetController';

@Security('jwt')
@Route('/projects')
@Tags('Projects')
class ProjectsDocsRoutes {
  @SuccessResponse('201', 'Created')
  @Post()
  static projectPostController(@Body() body: ProjectPostBody) {}

  @SuccessResponse('200', 'Updated')
  @Put('/{projectId}')
  static ProjectPutController(@Body() body: ProjectPutBody, @Path() projectId: string) {}

  @SuccessResponse('200', 'ok')
  @Post('/{projectId}/collaborators')
  static AddCollaboratorsController(@Body() body: AddCollaboratorsRequestBody, @Path() projectId: string) {}

  @Get('/me')
  static projectsByMemberGetController(): ProjectResponse[] {
    return [];
  }

  @SuccessResponse('200', 'deleted')
  @Delete('/{projectId}')
  static ProjectDeleteController(@Path() projectId: string) {}
}
