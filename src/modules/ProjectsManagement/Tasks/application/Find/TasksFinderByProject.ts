import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { Task } from '../../domain/Task';
import { TaskRepository } from '../../domain/TaskRepository';

export class TasksFinderByProject {
  constructor(private repository: TaskRepository) {}

  public async execute(projectId: string): Promise<Task[]> {
    const tasks = await this.repository.searchAllsByProject(new Uuid(projectId));
    if (!tasks) {
      throw new Error('task not found');
    }
    return tasks;
  }
}
