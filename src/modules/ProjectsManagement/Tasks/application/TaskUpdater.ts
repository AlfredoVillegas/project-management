import { Task } from '../domain/Task';
import { TaskRepository } from '../domain/TaskRepository';
import { TaskFinder } from './Find/TaskFinder';

interface TaskUpdaterParams {
  id: string;
  name?: string;
  description?: string;
}

export class TaskUpdater {
  private taskFinder: TaskFinder;
  constructor(private repository: TaskRepository) {
    this.taskFinder = new TaskFinder(this.repository);
  }

  async execute({ id, name, description }: TaskUpdaterParams): Promise<void> {
    let task = await this.taskFinder.execute(id);
    const newName = name || task.name;
    const newDescription = description || task.name;
    task = new Task(task.id, newName, newDescription, task.status, task.projectId, task.taskDependent);

    await this.repository.save(task);
  }
}
