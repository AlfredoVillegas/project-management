import { ContainerBuilder, Reference } from 'node-dependency-injection';
import { AddCollaboratorsController } from '../Projects/controllers/AddCollaboratorsController';
import { ProjectDeleteController } from '../Projects/controllers/ProjectDeleteController';
import { ProjectPostController } from '../Projects/controllers/ProjectPostController';
import { ProjectPutController } from '../Projects/controllers/ProjectPutController';
import { ProjectsByMemberGetController } from '../Projects/controllers/ProjectsByMemberGetController';
import { TaskAccepterController } from '../Task/controllers/TaskAccepterController';
import { TaskDeleteController } from '../Task/controllers/TaskDeleteController';
import { TaskPostController } from '../Task/controllers/TaskPostController';
import { TaskPutController } from '../Task/controllers/TaskPutController';
import { TasksByProjectGetController } from '../Task/controllers/TasksByProjectGetController';
import { TaskStatusPutController } from '../Task/controllers/TaskStatusPutController';

export function registerProjectsManagementControllersDependencys(container: ContainerBuilder) {
  // Projects Controllers
  container
    .register('Api.ProjectsManagement.controllers.ProjectPostController', ProjectPostController)
    .addArgument(new Reference('ProjectsManagement.projects.ProjectCreator'));

  container
    .register('Api.ProjectsManagement.controllers.ProjectPutController', ProjectPutController)
    .addArgument(new Reference('ProjectsManagement.projects.ProjectUpdater'));

  container
    .register('Api.ProjectsManagement.controllers.AddCollaboratorsController', AddCollaboratorsController)
    .addArgument(new Reference('ProjectsManagement.projects.AddCollaborators'));

  container
    .register('Api.ProjectsManagement.controllers.ProjectsByMemberGetController', ProjectsByMemberGetController)
    .addArgument(new Reference('ProjectsManagement.projects.ProjectsFinderByMember'));

  container
    .register('Api.ProjectsManagement.controllers.ProjectDeleteController', ProjectDeleteController)
    .addArgument(new Reference('ProjectsManagement.projects.ProjectDeleter'));

  // Task Controllers
  container
    .register('Api.ProjectsManagement.controllers.TaskPostController', TaskPostController)
    .addArgument(new Reference('ProjectsManagement.tasks.TaskCreator'));

  container
    .register('Api.ProjectsManagement.controllers.TaskPutController', TaskPutController)
    .addArgument(new Reference('ProjectsManagement.tasks.TaskUpdater'));

  container
    .register('Api.ProjectsManagement.controllers.TaskAccepterController', TaskAccepterController)
    .addArgument(new Reference('ProjectsManagement.tasks.TaskAccepter'));

  container
    .register('Api.ProjectsManagement.controllers.TaskStatusPutController', TaskStatusPutController)
    .addArgument(new Reference('ProjectsManagement.tasks.TaskStatusUpdater'));

  container
    .register('Api.ProjectsManagement.controllers.TasksByPojectGetController', TasksByProjectGetController)
    .addArgument(new Reference('ProjectsManagement.tasks.TaskFinderByProject'));

  container
    .register('Api.ProjectsManagement.controllers.TaskDeleteController', TaskDeleteController)
    .addArgument(new Reference('ProjectsManagement.tasks.TaskDeleter'));
}
