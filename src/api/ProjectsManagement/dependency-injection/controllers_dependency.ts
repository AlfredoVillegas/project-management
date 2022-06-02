import { ContainerBuilder, Reference } from 'node-dependency-injection';
import { ProjectPostController } from '../Projects/controllers/ProjectPostController';

export function registerProjectsControllersDependencys(container: ContainerBuilder) {
  container
    .register('Api.ProjectsManagement.controllers.ProjectPostController', ProjectPostController)
    .addArgument(new Reference('ProjectsManagement.projects.ProjectCreator'));
}
