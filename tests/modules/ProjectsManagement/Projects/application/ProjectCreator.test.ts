import { ProjectCreator } from '../../../../../src/modules/ProjectsManagement/Projects/application/ProjectCreator';
import { Project } from '../../../../../src/modules/ProjectsManagement/Projects/domain/Project';
import { Uuid } from '../../../../../src/modules/Shared/domain/value-object/Uuid';
import { EventBusMock } from '../__mocks__/EventBusMock';
import { projectDataForTest } from '../__mocks__/projectDataForTest';
import { ProjectRepositoryMock } from '../__mocks__/ProjectRepositoryMock';

let projectRepository: ProjectRepositoryMock;
let pojectCreator: ProjectCreator;
let eventBus: EventBusMock;

beforeEach(() => {
  eventBus = new EventBusMock();
  projectRepository = new ProjectRepositoryMock();
  pojectCreator = new ProjectCreator(projectRepository, eventBus);
});

describe('Test of ProjectCreator', () => {
  it('should create a valid Project', async () => {
    const projectData = projectDataForTest();

    await pojectCreator.execute(projectData);

    const projectInDb = await projectRepository.searchOneBy(new Uuid(projectData.id));

    expect(projectInDb).toBeInstanceOf(Project);
    expect(projectInDb?.id.value).toEqual(projectData.id);
    expect(eventBus.getCallsToPublishEvent()).toEqual(1);
  });
});
