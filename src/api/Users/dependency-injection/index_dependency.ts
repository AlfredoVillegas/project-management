import { ContainerBuilder } from 'node-dependency-injection';
import { registerUsersControllersDependencys } from './controllers_dependency';
import { registerUsersDependencys } from './users_dependencys';

export function registerUsersModuleDependencys(container: ContainerBuilder) {
  registerUsersDependencys(container);
  registerUsersControllersDependencys(container);
}
