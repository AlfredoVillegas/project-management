import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { Project } from '../../domain/Project';
import { ProjectNotExist } from '../../domain/ProjectNotExist';
import { ProjectRepository } from '../../domain/ProjectRepository';

export class ProjectsFinderByMember {
  constructor(private repository: ProjectRepository) {
    this.repository = repository;
  }

  public async execute(memberId: string): Promise<Project[]> {
    const projects = await this.repository.searchByMember(new Uuid(memberId));
    if (!projects) throw new ProjectNotExist(memberId);
    return projects;
  }
}
