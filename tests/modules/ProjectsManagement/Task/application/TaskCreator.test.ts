import { Uuid } from '../../../../../src/modules/Shared/domain/value-object/Uuid';
import { TaskCreator } from '../../../../../src/modules/ProjectsManagement/Tasks/application/TaskCreator';
import { Task } from '../../../../../src/modules/ProjectsManagement/Tasks/domain/Task';
import { EventBusMock } from '../../Projects/__mocks__/EventBusMock';
import { tasktDataForTest } from '../__mocks__/taskDataForTest';
import { TaskRepositoryMock } from '../__mocks__/TaskRepositoryMock';

let taskRepository: TaskRepositoryMock;
let taskCreator: TaskCreator;
let eventBus: EventBusMock;

beforeEach(() => {
  eventBus = new EventBusMock();
  taskRepository = new TaskRepositoryMock();
  taskCreator = new TaskCreator(taskRepository, eventBus);
});

describe('Test of TaskCreator', () => {
  it('should create a valid Task', async () => {
    const taskData = tasktDataForTest();

    await taskCreator.execute({ ...taskData });

    const taskInDb = await taskRepository.search(new Uuid(taskData.id));

    expect(taskInDb).toBeInstanceOf(Task);
    expect(taskInDb?.id.value).toEqual(taskData.id);
    expect(eventBus.getCallsToPublishEvent()).toEqual(1);
  });
});
