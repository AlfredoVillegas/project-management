import { Delete, Route, Security, SuccessResponse, Tags } from 'tsoa';

@Security('jwt')
@Route('/users')
@Tags('Users')
class UsersDocsRoutes {
  @SuccessResponse('200', 'Deleted')
  @Delete('/me')
  static UserDeleterController() {}
}
