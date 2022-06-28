import { Delete, Get, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { UserResponse } from './controllers/UserGetController';

@Security('jwt')
@Route('/users')
@Tags('Users')
class UsersDocsRoutes {
  @SuccessResponse('200')
  @Get('/me')
  static UserGetController(): UserResponse {
    return { id: '', name: '', email: '' };
  }

  @SuccessResponse('200', 'Deleted')
  @Delete('/me')
  static UserDeleterController() {}
}
