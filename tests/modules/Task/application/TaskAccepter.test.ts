import { Uuid } from '../../../../src/modules/Shared/domain/value-object/Uuid';
import { TaskAccepter } from '../../../../src/modules/Tasks/application/TaskAccepter';
import { EventBusMock } from '../../Project/__mocks__/EventBusMock';
import { tasktDataForTest } from '../__mocks__/taskDataForTest';
import { TaskRepositoryMock } from '../__mocks__/TaskRepositoryMosck';

let taskRepository: TaskRepositoryMock;
let taskAccepter: TaskAccepter;
let eventBus: EventBusMock;
let taskEntity = TaskRepositoryMock.createEntityDomainFromDataTest(tasktDataForTest());

beforeEach(() => {
  eventBus = new EventBusMock();
  taskRepository = new TaskRepositoryMock();
  taskAccepter = new TaskAccepter(taskRepository, eventBus);
  taskRepository.save(taskEntity);
});

describe('Test of TaskAccepter', () => {
  it('should acepted task of an existing task to "accepted" ', async () => {
    const statusExpected = 'accepted';

    await taskAccepter.execute(taskEntity.id.value, Uuid.random().value);

    const taskInDb = await taskRepository.search(new Uuid(taskEntity.id.value));
    expect(taskInDb?.status.value).toEqual(statusExpected);
    expect(eventBus.getCallsToPublishEvent()).toEqual(1);
  });
});
