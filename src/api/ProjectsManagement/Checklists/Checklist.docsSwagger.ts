import { Body, Delete, Get, Path, Post, Put, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { ChecklistCreatorParams } from '../../../modules/ProjectsManagement/CheckLists/application/ChecklistCreator';
import { ChecklistResponse } from '../../../modules/ProjectsManagement/CheckLists/application/Find/ChecklistsByTaskIdFinder';
import { ChecklistItemIsVerifiedPutBody } from './controllers/ChecklistItemIsVerifiedPutController';
import { ChecklistItemPostBody } from './controllers/ChecklistItemPostController';

@Security('jwt')
@Route('/checklists')
@Tags('Tasks/Checklist')
class ChecklistDocsRoutes {
  @SuccessResponse('201', 'Created')
  @Post()
  static ChecklistPostController(@Body() body: ChecklistCreatorParams) {}

  @SuccessResponse('201', 'Created')
  @Post('/{checklistId}/checklist-item')
  static ChecklistItemPostController(@Body() body: ChecklistItemPostBody, @Path() checklistId: string) {}

  @SuccessResponse('200', 'Updated')
  @Put('/{checklistId}/checklist-item/{checklistItemId}/is-verified')
  static ChecklistItemIsVerifiedPutController(
    @Body() body: ChecklistItemIsVerifiedPutBody,
    @Path() checklistId: string,
    @Path() checklistItemId: string
  ) {}

  @SuccessResponse('200', 'ok')
  @Put('/{checklistId}/name')
  static ChecklistNamePutController(@Body() body: { name: string }, @Path() checklistId: string) {}

  @SuccessResponse('200', 'ok')
  @Put('/{checklistId}/checklist-item/{checklistItemId}/name')
  static ChecklistItemNamePutController(
    @Body() body: { name: string },
    @Path() checklistId: string,
    @Path() checklistItemId: string
  ) {}

  @Get('/{taskId}')
  static ChecklistsByTaskGetController(@Path() taskId: string): ChecklistResponse[] {
    return [];
  }

  @SuccessResponse('200', 'deleted')
  @Delete('/{checklistId}')
  static ChecklistDeleteController(@Path() checklistId: string) {}

  @SuccessResponse('200', 'deleted')
  @Delete('/{checklistId}/checklist-item/{checklistItemId}')
  static ChecklistItemDeleteController(@Path() checklistId: string, @Path() checklistItemId: string) {}
}
