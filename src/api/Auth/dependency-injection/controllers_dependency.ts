import { ContainerBuilder, Reference } from 'node-dependency-injection';
import { UserRegister } from '../../../modules/Users/application/UserRegister';
import { TypeOrmUserRepository } from '../../../modules/Users/infrastructure/persistence/typeorm/TypeOrmUserRepository';
import { RegisterWhitGithubController } from '../controllers/registerWhitGithubController';

export function registerAuthControllersDependencys(container: ContainerBuilder) {
  container.register('User.UserRepository', TypeOrmUserRepository);

  container
    .register('User.UserRegister', UserRegister)
    .addArgument(new Reference('User.UserRepository'))
    .addArgument(new Reference('Shared.EventBus'));

  container
    .register('Api.Auth.controllers.RegisterWhitGithubController', RegisterWhitGithubController)
    .addArgument(new Reference('User.UserRegister'));
}
