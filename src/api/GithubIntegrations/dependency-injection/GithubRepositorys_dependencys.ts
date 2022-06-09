import { ContainerBuilder, Reference } from 'node-dependency-injection';
import { GithubRepositoryCreator } from '../../../modules/GithubIntegrations/GithubRepositorys/application/Create/GithubRepositoryCreator';
import { ForkCreator } from '../../../modules/GithubIntegrations/GithubRepositorys/application/CreateFork/ForkCreator';
import { ApiGithubRepositoryRemoteRepository } from '../../../modules/GithubIntegrations/GithubRepositorys/infrastructure/ApiGithubRepositoryRemoteRepository';
import { TypeOrmGithubRepositoryLocalRepository } from '../../../modules/GithubIntegrations/GithubRepositorys/infrastructure/persistence/TypeOrmGithubRepositoryLocalRepository';

export function registerGithubRepositorysDependencys(container: ContainerBuilder) {
  const repositoryLocalRepositoryReference = new Reference(
    'GithubIntegrations.GithubRepositorys.GithubRepositoryLocalRepository'
  );

  const repositoryRemoteRepositoryReference = new Reference(
    'GithubIntegrations.GithubRepositorys.GithubRepositoryRemoteRepository'
  );

  container.register(repositoryRemoteRepositoryReference.id, ApiGithubRepositoryRemoteRepository);

  container.register(repositoryLocalRepositoryReference.id, TypeOrmGithubRepositoryLocalRepository);

  container
    .register('GithubIntegrations.GithubRepositorys.GithubRepositoryCreator', GithubRepositoryCreator)
    .addArgument(repositoryRemoteRepositoryReference)
    .addArgument(repositoryLocalRepositoryReference);

  container
    .register('GithubIntegrations.GithubRepositorys.ForkCreator', ForkCreator)
    .addArgument(repositoryRemoteRepositoryReference)
    .addArgument(repositoryLocalRepositoryReference);
}
