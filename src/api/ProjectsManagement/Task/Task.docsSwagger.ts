import { Body, Delete, Get, Path, Post, Put, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { TaskPostBody } from './controllers/TaskPostController';
import { TaskPutBody } from './controllers/TaskPutController';
import { TaskResponse } from './controllers/TasksByProjectGetController';
import { TaskStatusPutBody } from './controllers/TaskStatusPutController';

@Security('jwt')
@Route('/tasks')
@Tags('Tasks')
class TasksDocsRoutes {
  @SuccessResponse('201', 'Created')
  @Post()
  static TaskPostController(@Body() body: TaskPostBody) {}

  @SuccessResponse('200', 'Updated')
  @Put('/{taskId}')
  static TaskPutController(@Body() body: TaskPutBody, @Path() taskId: string) {}

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

  @SuccessResponse('200', 'deleted')
  @Delete('/{taskId}')
  static ProjectDeleteController(@Path() taskId: string) {}
}
