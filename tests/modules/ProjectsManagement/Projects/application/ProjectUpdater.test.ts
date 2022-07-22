import { ProjectUpdater } from '../../../../../src/modules/ProjectsManagement/Projects/application/ProjectUpdater';
import { Project } from '../../../../../src/modules/ProjectsManagement/Projects/domain/Project';
import { projectDataForTest } from '../__mocks__/projectDataForTest';
import { ProjectRepositoryMock } from '../__mocks__/ProjectRepositoryMock';

describe('Project Updater', () => {
  const projectEntity = ProjectRepositoryMock.createProjectEntityFromTestData(projectDataForTest());
  let projectRepository: ProjectRepositoryMock;
  let projectUpdater: ProjectUpdater;

  beforeEach(() => {
    projectRepository = new ProjectRepositoryMock();
    projectUpdater = new ProjectUpdater(projectRepository);
  });

  it('should update name or description of an existing project ', async () => {
    await projectRepository.save(projectEntity);

    let expectedProject = {
      name: 'updated name',
      description: 'updated description'
    };

    await projectUpdater.execute(projectEntity.creator.value, {
      projectId: projectEntity.id.value,
      ...expectedProject
    });

    expectedProject = {
      ...projectEntity.toPrimitives(),
      name: expectedProject.name,
      description: expectedProject.description
    };
    const projectInDb = await projectRepository.searchOneBy(projectEntity.id);
    expect(projectInDb?.toPrimitives()).toEqual(expectedProject);
  });
});
