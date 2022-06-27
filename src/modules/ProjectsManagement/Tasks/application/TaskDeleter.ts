import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { TaskRepository } from '../domain/TaskRepository';

export class TaskDeleter {
  private repository: TaskRepository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  public async execute(taskId: string): Promise<void> {
    await this.repository.delete(new Uuid(taskId));
  }
}
