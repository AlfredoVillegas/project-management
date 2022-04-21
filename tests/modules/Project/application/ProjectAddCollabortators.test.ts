import { AddCollaborators } from '../../../../src/modules/Project/application/AddCollaborators';
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
  it('should add collaborators in project', async () => {
    const collaborator = Uuid.random();

    await addCollaborators.execute(projectEntity.id.value, [collaborator.value]);

    const projectInDb = await projectRepository.searchOneBy(projectEntity.id);
    const findCollaborator = projectInDb?.collaboratorsIds.find(coll => coll.value === collaborator.value);

    expect(findCollaborator).toBeInstanceOf(Uuid);
    expect(findCollaborator?.value).toEqual(collaborator.value);
    expect(eventBus.getCallsToPublishEvent()).toEqual(1);
  });
});
