import { Uuid } from '../../../../../src/modules/Shared/domain/value-object/Uuid';
import { TaskCreatorParams } from '../../../../../src/modules/ProjectsManagement/Tasks/application/TaskCreator';
import { Task } from '../../../../../src/modules/ProjectsManagement/Tasks/domain/Task';
import { TaskRepository } from '../../../../../src/modules/ProjectsManagement/Tasks/domain/TaskRepository';
import { TaskStatus } from '../../../../../src/modules/ProjectsManagement/Tasks/domain/TaskStatus';

export class TaskRepositoryMock implements TaskRepository {
  private tasks: Task[] = [];

  static createEntityDomainFromDataTest(data: TaskCreatorParams): Task {
    return new Task(new Uuid(data.id), data.name, data.description, new TaskStatus('todo'), Uuid.random());
  }

  async search(id: Uuid): Promise<Task | null | undefined> {
    return this.tasks.find(task => task.id.value === id.value);
  }

  async searchAllsByProject(projectId: Uuid): Promise<Task[] | null | undefined> {
    const tasks = this.tasks.filter(task => task.projectId.value === projectId.value);
    return tasks;
  }

  async save(project: Task): Promise<void> {
    this.tasks.push(project);
  }

  async delete(id: Uuid): Promise<void> {
    this.tasks.pop();
  }
}
