import { EventBus } from '../../Shared/domain/EventBus';
import { Uuid } from '../../Shared/domain/value-object/Uuid';
import { TaskRepository } from '../domain/TaskRepository';
import { TaskStatus } from '../domain/TaskStatus';
import { TaskFinder } from './Find/TaskFinder';

export class TaskStatusUpdater {
  private taskFinder: TaskFinder;
  constructor(private repository: TaskRepository, private eventBus: EventBus) {
    this.taskFinder = new TaskFinder(this.repository);
  }

  async execute(taskId: string, collaboratorId: string, status: string): Promise<void> {
    const task = await this.taskFinder.execute(taskId);

    const newStatus = new TaskStatus(status);
    task.updateStatus(new Uuid(collaboratorId), newStatus);

    await this.repository.save(task);
    await this.eventBus.publish(task.extractDomainEvents());
  }
}
