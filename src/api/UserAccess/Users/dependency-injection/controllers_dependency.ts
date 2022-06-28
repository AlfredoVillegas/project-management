import { ContainerBuilder } from 'node-dependency-injection';
import { UserDeleterController } from '../controllers/UserDeleterController';
import { UserGetController } from '../controllers/UserGetController';
import { userDeleterReference, userFinderByIdReference } from './users_dependencys';

export function registerUsersControllersDependencys(container: ContainerBuilder) {
  container.register('Api.Users.controllers.UserGetController', UserGetController).addArgument(userFinderByIdReference);

  container
    .register('Api.Users.controllers.UserDeleterController', UserDeleterController)
    .addArgument(userDeleterReference);
}
