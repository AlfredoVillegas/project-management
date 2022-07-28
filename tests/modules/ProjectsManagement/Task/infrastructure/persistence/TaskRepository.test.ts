import container from '../../../../../../src/api/shared/dependency-injection';
import { TaskRepository } from '../../../../../../src/modules/ProjectsManagement/Tasks/domain/TaskRepository';
import { createTypeOrmClientConnection } from '../../../../../../src/modules/Shared/infrastructure/persistense/typeorm/TypeOrmClient';
import { tasktDataForTest } from '../../__mocks__/taskDataForTest';
import { TaskRepositoryMock } from '../../__mocks__/TaskRepositoryMock';

let repository: TaskRepository;

beforeAll(async () => {
  console.log('conection ORM...');
  await createTypeOrmClientConnection();

  repository = container.get('ProjectsManagement.tasks.TaskRepository');
});

describe('TaskRepository', () => {
  describe('#save', () => {
    it('should save a task', async () => {
      const task = TaskRepositoryMock.createEntityDomainFromDataTest(tasktDataForTest());

      await repository.save(task);
    });
  });

  describe('#search', () => {
    it('should return an existing task', async () => {
      const expectedTask = TaskRepositoryMock.createEntityDomainFromDataTest(tasktDataForTest());
      await repository.save(expectedTask);

      const task = await repository.search(expectedTask.id);

      expect(expectedTask.toPrimitives()).toEqual(task?.toPrimitives());
    });
  });
});
