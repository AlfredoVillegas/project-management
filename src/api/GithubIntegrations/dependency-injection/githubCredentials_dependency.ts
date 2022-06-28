import { ContainerBuilder, Reference } from 'node-dependency-injection';
import { GithubCredentialCreator } from '../../../modules/GithubIntegrations/GithubCredentials/application/GithubCredentialCreator';
import { GithubCredentialTokenUpdater } from '../../../modules/GithubIntegrations/GithubCredentials/application/GithubCredentialTokenUpdater';
import { TypeOrmGithubCredentialRepository } from '../../../modules/GithubIntegrations/GithubCredentials/infrastructure/persistence/TypeOrmGithubCredentialRepository';

export function registerGithubCredentialsDependencys(container: ContainerBuilder) {
  const credentialRepositoryReference = new Reference(
    'GithubIntegrations.GithubCredentials.GithubCredentialRepository'
  );
  container.register(credentialRepositoryReference.id, TypeOrmGithubCredentialRepository);

  container
    .register('GithubIntegrations.GithubCredentials.GithubCredentialTokenUpdater', GithubCredentialTokenUpdater)
    .addArgument(credentialRepositoryReference);

  container
    .register('GithubIntegrations.GithubCredentials.GithubCredentialCreator', GithubCredentialCreator)
    .addArgument(credentialRepositoryReference);
}
