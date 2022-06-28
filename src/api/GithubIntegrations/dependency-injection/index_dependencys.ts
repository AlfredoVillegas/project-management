import { ContainerBuilder } from 'node-dependency-injection';
import { registerGithubCredentialsDependencys } from './githubCredentials_dependency';
import { registerGithubRepositorysDependencys } from './GithubRepositorys_dependencys';
import { registerGithubIntegrationsSubscribersDependencys } from './subscribers_dependencys';

export function registerGithubIntegrationsDependencys(container: ContainerBuilder) {
  registerGithubRepositorysDependencys(container);
  registerGithubCredentialsDependencys(container);
  registerGithubIntegrationsSubscribersDependencys(container);
}
