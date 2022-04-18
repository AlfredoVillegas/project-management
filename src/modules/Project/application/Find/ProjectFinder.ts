import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { Project } from '../../domain/Project';
import { ProjectNotExist } from '../../domain/ProjectNotExist';
import { ProjectRepository } from '../../domain/ProjectRepository';

export class ProjectFinder {
  constructor(private repository: ProjectRepository) {
    this.repository = repository;
  }

  public async execute(id: string): Promise<Project> {
    const project = await this.repository.searchOneBy(new Uuid(id));
    if (!project) throw new ProjectNotExist(id);
    return project;
  }
}
