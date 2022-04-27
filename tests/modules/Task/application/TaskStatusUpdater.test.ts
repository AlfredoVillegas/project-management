import { Uuid } from '../../../../src/modules/Shared/domain/value-object/Uuid';
import { TaskStatusUpdater } from '../../../../src/modules/Tasks/application/TaskStatusUpdater';
import { EventBusMock } from '../../Project/__mocks__/EventBusMock';
import { tasktDataForTest } from '../__mocks__/taskDataForTest';
import { TaskRepositoryMock } from '../__mocks__/TaskRepositoryMosck';

let taskRepository: TaskRepositoryMock;
let taskStatusUpdater: TaskStatusUpdater;
let eventBus: EventBusMock;
let taskEntity = TaskRepositoryMock.createEntityDomainFromDataTest(tasktDataForTest());

beforeEach(() => {
  eventBus = new EventBusMock();
  taskRepository = new TaskRepositoryMock();
  taskStatusUpdater = new TaskStatusUpdater(taskRepository, eventBus);
  taskRepository.save(taskEntity);
});

describe('Test of TaskStatusUpdater', () => {
  it('should update the status of an existing task to "accepted" ', async () => {
    const statusExpected = 'accepted';

    await taskStatusUpdater.execute(taskEntity.id.value, Uuid.random().value, statusExpected);

    const taskInDb = await taskRepository.search(new Uuid(taskEntity.id.value));
    expect(taskInDb?.status.value).toEqual(statusExpected);
    expect(eventBus.getCallsToPublishEvent()).toEqual(1);
  });
});
