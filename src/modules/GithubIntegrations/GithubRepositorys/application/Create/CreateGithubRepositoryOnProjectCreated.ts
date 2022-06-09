import { ProjectCreatedDomainEvent } from '../../../../ProjectsManagement/Projects/domain/ProjectCreatedDomainEvent';
import { DomainEventReceiver } from '../../../../Shared/domain/DomainEventReceiver';
import { GithubRepositoryCreator } from './GithubRepositoryCreator';

export class CreateGithubRepositoryOnProjectCreated implements DomainEventReceiver<ProjectCreatedDomainEvent> {
  constructor(private creator: GithubRepositoryCreator) {}
  async receive(domainEvent: ProjectCreatedDomainEvent): Promise<void> {
    const { name, description, creator } = domainEvent;
    const projectId = domainEvent.aggregateId;
    console.log('reeaaciooonoo  a CreateRepository');
    console.log(creator);
    await this.creator.execute({ name, description, creator, projectId });
  }
  susbcribedTo(): string[] {
    return [ProjectCreatedDomainEvent.EVENT_NAME];
  }
}
