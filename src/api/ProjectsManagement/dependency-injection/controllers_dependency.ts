import { ContainerBuilder, Reference } from 'node-dependency-injection';
import { AddCollaboratorsController } from '../Projects/controllers/AddCollaboratorsController';
import { ProjectPostController } from '../Projects/controllers/ProjectPostController';
import { ProjectsByMemberGetController } from '../Projects/controllers/ProjectsByMemberGetController';
import { TaskAccepterController } from '../Task/controllers/TaskAccepterController';
import { TaskPostController } from '../Task/controllers/TaskPostController';
import { TasksByProjectGetController } from '../Task/controllers/TasksByProjectGetController';
import { TaskStatusPutController } from '../Task/controllers/TaskStatusPutController';

export function registerProjectsManagementControllersDependencys(container: ContainerBuilder) {
  // Projects Controllers
  container
    .register('Api.ProjectsManagement.controllers.ProjectPostController', ProjectPostController)
    .addArgument(new Reference('ProjectsManagement.projects.ProjectCreator'));

  container
    .register('Api.ProjectsManagement.controllers.AddCollaboratorsController', AddCollaboratorsController)
    .addArgument(new Reference('ProjectsManagement.projects.AddCollaborators'));

  container
    .register('Api.ProjectsManagement.controllers.ProjectsByMemberGetController', ProjectsByMemberGetController)
    .addArgument(new Reference('ProjectsManagement.projects.ProjectsFinderByMember'));

  // Task Controllers
  container
    .register('Api.ProjectsManagement.controllers.TaskPostController', TaskPostController)
    .addArgument(new Reference('ProjectsManagement.tasks.TaskCreator'));

  container
    .register('Api.ProjectsManagement.controllers.TaskAccepterController', TaskAccepterController)
    .addArgument(new Reference('ProjectsManagement.tasks.TaskAccepter'));

  container
    .register('Api.ProjectsManagement.controllers.TaskStatusPutController', TaskStatusPutController)
    .addArgument(new Reference('ProjectsManagement.tasks.TaskStatusUpdater'));

  container
    .register('Api.ProjectsManagement.controllers.TasksByPojectGetController', TasksByProjectGetController)
    .addArgument(new Reference('ProjectsManagement.tasks.TaskFinderByProject'));
}
