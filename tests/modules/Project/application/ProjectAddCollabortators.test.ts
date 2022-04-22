import { AddCollaborators } from '../../../../src/modules/Projects/application/AddCollaborators';
import { Uuid } from '../../../../src/modules/Shared/domain/value-object/Uuid';
import { EventBusMock } from '../__mocks__/EventBusMock';
import { projectDataForTest } from '../__mocks__/projectDataForTest';
import { ProjectRepositoryMock } from '../__mocks__/ProjectRepositoryMock';

let projectRepository: ProjectRepositoryMock;
let addCollaborators: AddCollaborators;
let eventBus: EventBusMock;
let projectEntity = ProjectRepositoryMock.createEntityDomainFromDataTest(projectDataForTest());

beforeEach(() => {
  eventBus = new EventBusMock();
  projectRepository = new ProjectRepositoryMock();
  addCollaborators = new AddCollaborators(projectRepository, eventBus);
  projectRepository.save(projectEntity);
});

describe('Test of Project AddCollaborators', () => {
  it('should must add collaborators to an existing project', async () => {
    const collaborator = Uuid.random();

    await addCollaborators.execute(projectEntity.id.value, [collaborator.value]);

    const projectInDb = await projectRepository.searchOneBy(projectEntity.id);
    const collaboratorFound = projectInDb?.collaboratorsIds.find(coll => coll.value === collaborator.value);

    expect(collaboratorFound).toBeInstanceOf(Uuid);
    expect(collaboratorFound?.value).toEqual(collaborator.value);
    expect(eventBus.getCallsToPublishEvent()).toEqual(1);
  });
});
