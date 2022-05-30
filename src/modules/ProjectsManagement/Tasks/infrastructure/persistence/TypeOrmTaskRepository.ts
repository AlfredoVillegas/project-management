import { getConnection, Repository } from 'typeorm';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { Task } from '../../domain/Task';
import { TaskRepository } from '../../domain/TaskRepository';
import { TaskEntitySchema } from './typeorm/TaskEntity';

export class TypeOrmTaskRepository implements TaskRepository {
  private repository: Repository<Task>;
  constructor() {
    this.repository = getConnection().getRepository(TaskEntitySchema);
  }
  async save(task: Task): Promise<void> {
    await this.repository.save(task);
  }
  async search(id: Uuid): Promise<Task | null | undefined> {
    const task = await this.repository.findOne({ id });
    return task;
  }
  async searchAllsByProject(projectId: Uuid): Promise<Task[] | null | undefined> {
    const tasks = await this.repository.find({ projectId: projectId });
    return tasks;
  }
}
