import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { NotHaveCreatePermission } from '../domain/Errors';
import { ProjectRepository } from '../domain/ProjectRepository';
import { ProjectFinder } from './Find/ProjectFinder';

interface updateProjectParams {
  projectId: string;
  name?: string;
  description?: string;
}

export class ProjectUpdater {
  private repository: ProjectRepository;
  private finder: ProjectFinder;

  constructor(repository: ProjectRepository) {
    this.repository = repository;
    this.finder = new ProjectFinder(repository);
  }

  public async execute(userId: string, { projectId, name, description }: updateProjectParams): Promise<void> {
    const project = await this.finder.execute(projectId);

    const user = new Uuid(userId);
    if (!project.hasCreatePermission(user)) {
      throw new NotHaveCreatePermission(user.value, project.id.value);
    }

    project.UpdateMainAttributes(name, description);

    await this.repository.save(project);
  }
}
