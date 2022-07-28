import { EventBus } from '../../../Shared/domain/EventBus';
import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { DependencyNotCompleted } from '../domain/Errors';
import { Task } from '../domain/Task';
import { TaskRepository } from '../domain/TaskRepository';
import { TaskFinder } from './Find/TaskFinder';

export class TaskAccepter {
  private taskFinder: TaskFinder;
  constructor(private repository: TaskRepository, private eventBus: EventBus) {
    this.taskFinder = new TaskFinder(this.repository);
  }

  async execute(taskId: string, collaboratorId: string): Promise<void> {
    const task = await this.taskFinder.execute(taskId);

    const dependentTaskIscompleted = await this.dependentTaskIscompleted(task);
    if (!dependentTaskIscompleted) {
      throw new DependencyNotCompleted();
    }

    task.accept(new Uuid(collaboratorId));

    await this.repository.save(task);
    await this.eventBus.publish(task.extractDomainEvents());
  }

  private async dependentTaskIscompleted(task: Task): Promise<boolean> {
    if (!task.taskDependent) {
      return true;
    }
    const taskDependent = await this.taskFinder.execute(task.taskDependent.value);

    return taskDependent.isCompleted();
  }
}
