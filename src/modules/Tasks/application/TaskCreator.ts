import { EventBus } from '../../Shared/domain/EventBus';
import { Uuid } from '../../Shared/domain/value-object/Uuid';
import { Task } from '../domain/Task';
import { TaskRepository } from '../domain/TaskRepository';

export interface TaskCreatorParams {
  id: string;
  name: string;
  description: string;
  projectId: string;
}

export class TaskCreator {
  constructor(private repository: TaskRepository, private eventBus: EventBus) {}

  async execute({ id, name, description, projectId }: TaskCreatorParams): Promise<void> {
    const task = Task.create(new Uuid(id), name, description, new Uuid(projectId));

    await this.repository.save(task);

    await this.eventBus.publish(task.extractDomainEvents());
  }
}
