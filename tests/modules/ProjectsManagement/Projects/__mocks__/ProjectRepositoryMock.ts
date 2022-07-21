import { ProjectParams } from '../../../../../src/modules/ProjectsManagement/Projects/application/ProjectCreator';
import { Project } from '../../../../../src/modules/ProjectsManagement/Projects/domain/Project';
import { ProjectRepository } from '../../../../../src/modules/ProjectsManagement/Projects/domain/ProjectRepository';
import { Uuid } from '../../../../../src/modules/Shared/domain/value-object/Uuid';

export class ProjectRepositoryMock implements ProjectRepository {
  private mockSave = jest.fn();

  async save(project: Project): Promise<void> {
    this.mockSave(project);
  }

  async delete(id: Uuid): Promise<void> {
    this.mockSave.mock.calls[this.mockSave.mock.calls.length - 1][0] = undefined;
  }

  search(): Promise<Project[] | null | undefined> {
    throw new Error('Method not implemented.');
  }
  searchByMember(Member: Uuid): Promise<Project[] | null | undefined> {
    throw new Error('Method not implemented.');
  }

  async searchOneBy(id: Uuid): Promise<Project | null | undefined> {
    const lastProjectSave = this.mockSave.mock.calls[this.mockSave.mock.calls.length - 1][0] as Project;
    return lastProjectSave;
  }

  static createProjectEntityFromTestData(data: ProjectParams): Project {
    return new Project(new Uuid(data.id), data.name, data.description, new Uuid(data.creator));
  }
}

/*
export class ProjectRepositoryMock implements ProjectRepository {
  private projects: Project[] = [];

  static createProjectEntityFromTestData(data: ProjectParams): Project {
    return new Project(new Uuid(data.id), data.name, data.description, new Uuid(data.creator));
  }

  async save(project: Project): Promise<void> {
    this.projects.push(project);
  }
  async search(): Promise<Project[]> {
    return this.projects;
  }
  async searchByMember(Member: Uuid): Promise<Project[] | null | undefined> {
    const projects = this.projects.filter(project => {
      const collaborators = project.collaboratorsIds.map(element => element.value);

      if (project.creator.value === Member.value || collaborators.includes(Member.value)) {
        return project;
      }
    });
    return projects;
  }
  async searchOneBy(id: Uuid): Promise<Project | null | undefined> {
    return this.projects.find(project => project.id.value === id.value);
  }

  async delete(id: Uuid): Promise<void> {
    this.projects.pop();
  }
}*/
