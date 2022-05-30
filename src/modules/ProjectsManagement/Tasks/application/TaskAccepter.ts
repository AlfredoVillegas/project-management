import { EventBus } from '../../../Shared/domain/EventBus';
import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { TaskRepository } from '../domain/TaskRepository';
import { TaskFinder } from './Find/TaskFinder';

export class TaskAccepter {
  private taskFinder: TaskFinder;
  constructor(private repository: TaskRepository, private eventBus: EventBus) {
    this.taskFinder = new TaskFinder(this.repository);
  }

  async execute(taskId: string, collaboratorId: string): Promise<void> {
    const task = await this.taskFinder.execute(taskId);

    task.accept(new Uuid(collaboratorId));

    await this.repository.save(task);
    await this.eventBus.publish(task.extractDomainEvents());
  }
}
