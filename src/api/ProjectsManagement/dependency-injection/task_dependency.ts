import { ContainerBuilder, Reference } from 'node-dependency-injection';
import { TypeOrmTaskRepository } from '../../../modules/ProjectsManagement/Tasks/infrastructure/persistence/TypeOrmTaskRepository';

export function registerTaskDependencys(container: ContainerBuilder) {
  container.register('ProjectsManagement.task.TaskRepository', TypeOrmTaskRepository);

  const taskRepositoryReference = new Reference('ProjectsManagement.task.TaskRepository');
}
