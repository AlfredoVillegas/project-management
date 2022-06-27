import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { Task } from './Task';

export interface TaskRepository {
  save(task: Task): Promise<void>;
  search(id: Uuid): Promise<Task | null | undefined>;
  searchAllsByProject(projectId: Uuid): Promise<Task[] | null | undefined>;
  delete(id: Uuid): Promise<void>;
}
