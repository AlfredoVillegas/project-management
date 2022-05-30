import { EventBus } from '../../../Shared/domain/EventBus';
import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { ProjectRepository } from '../domain/ProjectRepository';
import { ProjectFinder } from './Find/ProjectFinder';

export class AddCollaborators {
  private repository: ProjectRepository;
  private eventBus: EventBus;
  private ProjectFinderService: ProjectFinder;

  constructor(repository: ProjectRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
    this.ProjectFinderService = new ProjectFinder(repository);
  }

  public async execute(projectId: string, collaborators: string[]): Promise<void> {
    const project = await this.ProjectFinderService.execute(projectId);

    const collaboratorsUuid = collaborators.map(element => new Uuid(element));
    project.addCollaborators(collaboratorsUuid);

    await this.repository.save(project);
    return await this.eventBus.publish(project.extractDomainEvents());
  }
}
