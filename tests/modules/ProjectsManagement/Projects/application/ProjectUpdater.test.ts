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

    let updatedProject = {
      projectId: projectEntity.id.value,
      name: 'updated name',
      description: 'updated description'
    };
    await projectUpdater.execute(projectEntity.creator.value, { ...updatedProject });

    const projectInDb = await projectRepository.searchOneBy(projectEntity.id);
    expect(projectInDb).toBeInstanceOf(Project);
    expect(projectInDb?.id.value).toEqual(updatedProject.projectId);
    expect(projectInDb?.name).toEqual(updatedProject.name);
    expect(projectInDb?.description).toEqual(updatedProject.description);
  });
});
