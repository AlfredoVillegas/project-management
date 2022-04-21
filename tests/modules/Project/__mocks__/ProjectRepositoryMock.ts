import { ProjectParams } from '../../../../src/modules/Project/application/ProjectCreator';
import { Project } from '../../../../src/modules/Project/domain/Project';
import { ProjectRepository } from '../../../../src/modules/Project/domain/ProjectRepository';
import { Uuid } from '../../../../src/modules/Shared/domain/value-object/Uuid';

export class ProjectRepositoryMock implements ProjectRepository {
  private projects: Project[] = [];

  static createEntityDomainFromDataTest(data: ProjectParams): Project {
    return new Project(new Uuid(data.id), data.name, data.description, new Uuid(data.creator), []);
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
}
