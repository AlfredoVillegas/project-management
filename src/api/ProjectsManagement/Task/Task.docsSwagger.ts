import { Body, Get, Path, Post, Put, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { TaskPostBody } from './controllers/TaskPostController';
import { TaskResponse } from './controllers/TasksByProjectGetController';
import { TaskStatusPutBody } from './controllers/TaskStatusPutController';

@Security('jwt')
@Route('/tasks')
@Tags('Tasks')
class TasksDocsRoutes {
  @SuccessResponse('201', 'Created')
  @Post()
  static TaskPostController(@Body() body: TaskPostBody) {}

  @SuccessResponse('200', 'ok')
  @Put('/{id}/status')
  static TaskStatusPutController(@Body() body: TaskStatusPutBody, @Path() id: string) {}

  @SuccessResponse('200', 'ok')
  @Put('/{id}/accept')
  static TaskAccepterController(@Path() id: string) {}

  @Get('/{projectId}')
  static TaskByMemberGetController(@Path() projectId: string): TaskResponse[] {
    return [];
  }
}
