import { ContainerBuilder, Reference } from 'node-dependency-injection';
import { CreateGithubRepositoryOnProjectCreated } from '../../../modules/GithubIntegrations/GithubRepositorys/application/Create/CreateGithubRepositoryOnProjectCreated';
import { CreateForkOnTaskAccepted } from '../../../modules/GithubIntegrations/GithubRepositorys/application/CreateFork/CreateForkOnTaskAccepted';

export function registerGithubIntegrationsSubscribersDependencys(container: ContainerBuilder) {
  container
    .register(
      'GithubIntegrations.GithubRepositorys.CreateGithubRepositoryOnProjectCreated',
      CreateGithubRepositoryOnProjectCreated
    )
    .addArgument(new Reference('GithubIntegrations.GithubRepositorys.GithubRepositoryCreator'));

  container
    .register('GithubIntegrations.GithubRepositorys.CreateForkOnTaskAccepted', CreateForkOnTaskAccepted)
    .addArgument(new Reference('GithubIntegrations.GithubRepositorys.ForkCreator'));
}
