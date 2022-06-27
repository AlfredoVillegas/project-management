import { ContainerBuilder, Reference } from 'node-dependency-injection';
import { AddCollaborators } from '../../../modules/ProjectsManagement/Projects/application/AddCollaborators';
import { ProjectFinder } from '../../../modules/ProjectsManagement/Projects/application/Find/ProjectFinder';
import { ProjectsFinderByMember } from '../../../modules/ProjectsManagement/Projects/application/Find/ProjectsFinderByMember';
import { ProjectCreator } from '../../../modules/ProjectsManagement/Projects/application/ProjectCreator';
import { ProjectDeleter } from '../../../modules/ProjectsManagement/Projects/application/ProjectDeleter';
import { ProjectUpdater } from '../../../modules/ProjectsManagement/Projects/application/ProjectUpdater';
import { TypeOrmProjectRepository } from '../../../modules/ProjectsManagement/Projects/infrastructure/persistence/TypeOrmProjectRepository';

export function registerProjectsDependencys(container: ContainerBuilder) {
  container.register('ProjectsManagement.projects.ProjectRepository', TypeOrmProjectRepository);

  const projectRepositoryReference = new Reference('ProjectsManagement.projects.ProjectRepository');
  const eventsBusReference = new Reference('Shared.EventBus');

  container
    .register('ProjectsManagement.projects.ProjectCreator', ProjectCreator)
    .addArgument(projectRepositoryReference)
    .addArgument(eventsBusReference);

  container
    .register('ProjectsManagement.projects.AddCollaborators', AddCollaborators)
    .addArgument(projectRepositoryReference)
    .addArgument(eventsBusReference);

  container
    .register('ProjectsManagement.projects.ProjectFinder', ProjectFinder)
    .addArgument(projectRepositoryReference);

  container
    .register('ProjectsManagement.projects.ProjectsFinderByMember', ProjectsFinderByMember)
    .addArgument(projectRepositoryReference);

  container
    .register('ProjectsManagement.projects.ProjectDeleter', ProjectDeleter)
    .addArgument(projectRepositoryReference);

  container
    .register('ProjectsManagement.projects.ProjectUpdater', ProjectUpdater)
    .addArgument(projectRepositoryReference);
}
