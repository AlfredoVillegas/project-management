import { ContainerBuilder } from 'node-dependency-injection';
import { UserDeleterController } from '../controllers/UserDeleterController';
import { userDeleterReference } from './users_dependencys';

export function registerUsersControllersDependencys(container: ContainerBuilder) {
  container
    .register('Api.Users.controllers.UserDeleterController', UserDeleterController)
    .addArgument(userDeleterReference);
}
