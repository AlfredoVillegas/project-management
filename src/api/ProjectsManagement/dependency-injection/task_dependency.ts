import { ContainerBuilder, Reference } from 'node-dependency-injection';
import { TasksFinderByProject } from '../../../modules/ProjectsManagement/Tasks/application/Find/TasksFinderByProject';
import { TaskAccepter } from '../../../modules/ProjectsManagement/Tasks/application/TaskAccepter';
import { TaskCreator } from '../../../modules/ProjectsManagement/Tasks/application/TaskCreator';
import { TaskStatusUpdater } from '../../../modules/ProjectsManagement/Tasks/application/TaskStatusUpdater';
import { TypeOrmTaskRepository } from '../../../modules/ProjectsManagement/Tasks/infrastructure/persistence/TypeOrmTaskRepository';

export function registerTaskDependencys(container: ContainerBuilder) {
  container.register('ProjectsManagement.tasks.TaskRepository', TypeOrmTaskRepository);

  const taskRepositoryReference = new Reference('ProjectsManagement.tasks.TaskRepository');
  const eventsBusReference = new Reference('Shared.EventBus');

  container
    .register('ProjectsManagement.tasks.TaskCreator', TaskCreator)
    .addArgument(taskRepositoryReference)
    .addArgument(eventsBusReference);

  container
    .register('ProjectsManagement.tasks.TaskAccepter', TaskAccepter)
    .addArgument(taskRepositoryReference)
    .addArgument(eventsBusReference);

  container
    .register('ProjectsManagement.tasks.TaskStatusUpdater', TaskStatusUpdater)
    .addArgument(taskRepositoryReference)
    .addArgument(eventsBusReference);

  container
    .register('ProjectsManagement.tasks.TaskFinderByProject', TasksFinderByProject)
    .addArgument(taskRepositoryReference);
}
