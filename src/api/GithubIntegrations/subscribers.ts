import { EventBus } from '../../modules/Shared/domain/EventBus';
import container from '../shared/dependency-injection';

export function registerGithubIntegrationsSubscribers() {
  const eventBus = container.get('Shared.EventBus') as EventBus;

  const createGithubRepositoryOnProjectCreated = container.get(
    'GithubIntegrations.GithubRepositorys.CreateGithubRepositoryOnProjectCreated'
  );
  eventBus.addSubscriber(createGithubRepositoryOnProjectCreated);

  const createForkOnTaskAccepted = container.get('GithubIntegrations.GithubRepositorys.CreateForkOnTaskAccepted');
  eventBus.addSubscriber(createForkOnTaskAccepted);
}
