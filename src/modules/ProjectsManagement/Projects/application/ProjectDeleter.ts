import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { NotHaveCreatePermission } from '../domain/Errors';
import { ProjectRepository } from '../domain/ProjectRepository';
import { ProjectFinder } from './Find/ProjectFinder';

export class ProjectDeleter {
  private repository: ProjectRepository;
  private finder: ProjectFinder;

  constructor(repository: ProjectRepository) {
    this.repository = repository;
    this.finder = new ProjectFinder(repository);
  }

  public async execute(projectId: string, userId: string): Promise<void> {
    const project = await this.finder.execute(projectId);

    const user = new Uuid(userId);
    if (!project.hasCreatePermission(user)) {
      throw new NotHaveCreatePermission(user.value, project.id.value);
    }

    await this.repository.delete(project.id);
  }
}
