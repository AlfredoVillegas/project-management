import { Uuid } from '../../../../../src/modules/Shared/domain/value-object/Uuid';
import { TaskStatusUpdater } from '../../../../../src/modules/ProjectsManagement/Tasks/application/TaskStatusUpdater';
import { EventBusMock } from '../../Projects/__mocks__/EventBusMock';
import { tasktDataForTest } from '../__mocks__/taskDataForTest';
import { TaskRepositoryMock } from '../__mocks__/TaskRepositoryMock';

describe('Test of TaskStatusUpdater', () => {
  let taskRepository: TaskRepositoryMock;
  let taskStatusUpdater: TaskStatusUpdater;
  let eventBus: EventBusMock;
  let taskEntity = TaskRepositoryMock.createEntityDomainFromDataTest(tasktDataForTest());

  beforeEach(() => {
    eventBus = new EventBusMock();
    taskRepository = new TaskRepositoryMock();
    taskStatusUpdater = new TaskStatusUpdater(taskRepository, eventBus);
  });

  it('should update the status of an existing task to "completed" ', async () => {
    await taskRepository.save(taskEntity);

    const statusExpected = 'completed';
    await taskStatusUpdater.execute(taskEntity.id.value, Uuid.random().value, statusExpected);

    const taskInDb = await taskRepository.search(new Uuid(taskEntity.id.value));
    expect(taskInDb?.id.value).toEqual(taskEntity.id.value);
    expect(taskInDb?.status.value).toEqual(statusExpected);
    expect(eventBus.getCallsToPublishEvent()).toEqual(1);
  });
});
