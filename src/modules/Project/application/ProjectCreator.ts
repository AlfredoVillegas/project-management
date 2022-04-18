import { EventBus } from '../../Shared/domain/EventBus';
import { Uuid } from '../../Shared/domain/value-object/Uuid';
import { Project } from '../domain/Project';
import { ProjectRepository } from '../domain/ProjectRepository';

export interface ProjectParams {
  id: string;
  name: string;
  description: string;
  creator: string;
  collaboratorsIds?: string[];
}

export class ProjectCreator {
  private repository: ProjectRepository;
  private eventBus: EventBus;

  constructor(repository: ProjectRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  public async execute({ id, name, description, creator, collaboratorsIds }: ProjectParams): Promise<void> {
    const project = Project.create(
      new Uuid(id),
      name,
      description,
      new Uuid(creator),
      collaboratorsIds?.map(coll => new Uuid(coll))
    );

    await this.repository.save(project);

    return await this.eventBus.publish(project.extractDomainEvents());
  }
}
