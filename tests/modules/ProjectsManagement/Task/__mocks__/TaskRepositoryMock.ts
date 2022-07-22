import { Uuid } from '../../../../../src/modules/Shared/domain/value-object/Uuid';
import { TaskCreatorParams } from '../../../../../src/modules/ProjectsManagement/Tasks/application/TaskCreator';
import { Task } from '../../../../../src/modules/ProjectsManagement/Tasks/domain/Task';
import { TaskRepository } from '../../../../../src/modules/ProjectsManagement/Tasks/domain/TaskRepository';
import { TaskStatus } from '../../../../../src/modules/ProjectsManagement/Tasks/domain/TaskStatus';

export class TaskRepositoryMock implements TaskRepository {
  private mockSave = jest.fn();

  static createEntityDomainFromDataTest(data: TaskCreatorParams): Task {
    return new Task(new Uuid(data.id), data.name, data.description, new TaskStatus('todo'), Uuid.random());
  }

  async save(task: Task): Promise<void> {
    this.mockSave(task);
  }

  async search(id: Uuid): Promise<Task | null | undefined> {
    const lastSavedTask = this.mockSave.mock.calls[this.mockSave.mock.calls.length - 1][0] as Task;
    return lastSavedTask;
  }

  searchAllsByProject(projectId: Uuid): Promise<Task[] | null | undefined> {
    throw new Error('Method not implemented.');
  }

  async delete(id: Uuid): Promise<void> {
    this.mockSave.mock.calls[this.mockSave.mock.calls.length - 1][0] = undefined;
  }
}
