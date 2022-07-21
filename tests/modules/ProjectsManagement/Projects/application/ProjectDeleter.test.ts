import { ProjectDeleter } from '../../../../../src/modules/ProjectsManagement/Projects/application/ProjectDeleter';
import { NotHaveCreatePermission } from '../../../../../src/modules/ProjectsManagement/Projects/domain/Errors';
import { Uuid } from '../../../../../src/modules/Shared/domain/value-object/Uuid';
import { projectDataForTest } from '../__mocks__/projectDataForTest';
import { ProjectRepositoryMock } from '../__mocks__/ProjectRepositoryMock';

describe('Test of ProjectDeleter', () => {
  const projectEntity = ProjectRepositoryMock.createProjectEntityFromTestData(projectDataForTest());
  let projectRepository: ProjectRepositoryMock;
  let pojectDeleter: ProjectDeleter;

  beforeEach(() => {
    projectRepository = new ProjectRepositoryMock();
    pojectDeleter = new ProjectDeleter(projectRepository);
  });

  it('should delete a exist Project', async () => {
    await projectRepository.save(projectEntity);

    await pojectDeleter.execute(projectEntity.id.value, projectEntity.creator.value);

    const projectInDb = await projectRepository.searchOneBy(projectEntity.id);
    expect(projectInDb).toBeUndefined();
  });

  it('should throw an error if the user is not the creator', async () => {
    await projectRepository.save(projectEntity);

    const userRandom = Uuid.random();

    expect.assertions(1);
    try {
      await pojectDeleter.execute(projectEntity.id.value, userRandom.value);
    } catch (error) {
      expect(error).toBeInstanceOf(NotHaveCreatePermission);
    }
  });
});
