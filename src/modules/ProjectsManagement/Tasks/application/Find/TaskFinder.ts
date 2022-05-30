import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { TaskNotExist } from '../../domain/Errors';
import { Task } from '../../domain/Task';
import { TaskRepository } from '../../domain/TaskRepository';

export class TaskFinder {
  constructor(private repository: TaskRepository) {}
  async execute(taskId: string): Promise<Task> {
    const task = await this.repository.search(new Uuid(taskId));
    if (!task) {
      throw new TaskNotExist(taskId);
    }
    return task;
  }
}
