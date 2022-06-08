import { ContainerBuilder, Reference } from 'node-dependency-injection';
import { AddCollaborators } from '../../../modules/ProjectsManagement/Projects/application/AddCollaborators';
import { ProjectFinder } from '../../../modules/ProjectsManagement/Projects/application/Find/ProjectFinder';
import { ProjectsFinderByMember } from '../../../modules/ProjectsManagement/Projects/application/Find/ProjectsFinderByMember';
import { ProjectCreator } from '../../../modules/ProjectsManagement/Projects/application/ProjectCreator';
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
}

/*
  const projectCreator = new Definition(ProjectCreator, [
    new Reference('ProjectsManagement.projects.ProjectRepository'),
    new Reference('Shared.EventBus')
  ]);
   const projectRepository = new Definition(TypeOrmProjectRepository, [new Reference('some-npm-package')]);

  container.setDefinition('ProjectsManagement.projects.ProjectRepository', projectRepository);
  container.setDefinition('ProjectsManagement.projects.ProjectCreator', projectCreator);*/
