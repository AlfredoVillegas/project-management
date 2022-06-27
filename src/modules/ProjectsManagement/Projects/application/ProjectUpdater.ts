import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { NotHaveCreatePermission } from '../domain/Errors';
import { Project } from '../domain/Project';
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
    let project = await this.finder.execute(projectId);

    const user = new Uuid(userId);
    if (!project.hasCreatePermission(user)) {
      throw new NotHaveCreatePermission(user.value, project.id.value);
    }

    const newName = name || project.name;
    const newDescription = description || project.description;
    project = new Project(project.id, newName, newDescription, project.creator, project.collaboratorsIds);

    await this.repository.save(project);
  }
}
