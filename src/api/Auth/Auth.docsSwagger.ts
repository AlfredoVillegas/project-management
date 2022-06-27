import { Get, Route, SuccessResponse, Tags } from 'tsoa';

@Route('/')
@Tags('Auth')
class AuthDocsRoutes {
  /**
   * Return html with url to register or login with Github
   */
  @SuccessResponse('200', 'HTML render')
  @Get('')
  static indexController() {}
}
