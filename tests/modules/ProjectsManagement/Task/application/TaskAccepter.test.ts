import { TaskAccepter } from '../../../../../src/modules/ProjectsManagement/Tasks/application/TaskAccepter';
import { DependencyNotCompleted } from '../../../../../src/modules/ProjectsManagement/Tasks/domain/Errors';
import { Uuid } from '../../../../../src/modules/Shared/domain/value-object/Uuid';
import { EventBusMock } from '../../Projects/__mocks__/EventBusMock';
import { tasktDataForTest } from '../__mocks__/taskDataForTest';
import { TaskRepositoryMock } from '../__mocks__/TaskRepositoryMock';

let taskRepository: TaskRepositoryMock;
let taskAccepter: TaskAccepter;
let eventBus: EventBusMock;
let taskEntity = TaskRepositoryMock.createEntityDomainFromDataTest(tasktDataForTest());

beforeEach(() => {
  eventBus = new EventBusMock();
  taskRepository = new TaskRepositoryMock();
  taskAccepter = new TaskAccepter(taskRepository, eventBus);
});

describe('Test of TaskAccepter', () => {
  it('should acepted task of an existing task to "accepted" ', async () => {
    taskRepository.save(taskEntity);
    const statusExpected = 'accepted';

    await taskAccepter.execute(taskEntity.id.value, Uuid.random().value);

    const taskInDb = await taskRepository.search(new Uuid(taskEntity.id.value));
    expect(taskInDb?.status.value).toEqual(statusExpected);
    expect(eventBus.getCallsToPublishEvent()).toEqual(1);
  });

  it('should refuse to accept a task that has an incomplete dependency', async () => {
    const taskDependent = TaskRepositoryMock.createEntityDomainFromDataTest(tasktDataForTest());
    await taskRepository.save(taskDependent);
    const taskData = tasktDataForTest();
    taskData.taskDependent = taskDependent.id.value;
    const taskEntity = TaskRepositoryMock.createEntityDomainFromDataTest(taskData);
    await taskRepository.save(taskEntity);

    expect.assertions(1);
    try {
      await taskAccepter.execute(taskEntity.id.value, Uuid.random().value);
    } catch (error) {
      expect(error).toBeInstanceOf(DependencyNotCompleted);
    }
  });
});
