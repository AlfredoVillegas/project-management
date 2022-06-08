import { ContainerBuilder } from 'node-dependency-injection';
import { registerProjectsManagementControllersDependencys } from './controllers_dependency';
import { registerProjectsDependencys } from './projects_dependency';
import { registerTaskDependencys } from './task_dependency';

export function registerProjectsManagementDependencys(container: ContainerBuilder) {
  registerProjectsDependencys(container);
  registerProjectsManagementControllersDependencys(container);
  registerTaskDependencys(container);
}
