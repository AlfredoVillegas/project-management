import { ContainerBuilder, Reference } from 'node-dependency-injection';
import { UserRegister } from '../../../modules/UserAccess/Users/application/UserRegister';
import { TypeOrmUserRepository } from '../../../modules/UserAccess/Users/infrastructure/persistence/typeorm/TypeOrmUserRepository';
import { LoginGithubController } from '../controllers/loginGithubController';
import { RegisterWhitGithubController } from '../controllers/registerWhitGithubController';

export function registerAuthControllersDependencys(container: ContainerBuilder) {
  container.register('User.UserRepository', TypeOrmUserRepository);

  container
    .register('User.UserRegister', UserRegister)
    .addArgument(new Reference('User.UserRepository'))
    .addArgument(new Reference('Shared.EventBus'));

  container
    .register('Api.Auth.controllers.RegisterWhitGithubController', RegisterWhitGithubController)
    .addArgument(new Reference('User.UserRegister'))
    .addArgument(new Reference('GithubIntegrations.GithubCredentials.GithubCredentialCreator'));

  container
    .register('Api.Auth.controllers.LoginGithubController', LoginGithubController)
    .addArgument(new Reference('GithubIntegrations.GithubCredentials.GithubCredentialTokenUpdater'));
}
