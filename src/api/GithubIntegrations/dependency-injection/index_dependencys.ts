import { ContainerBuilder } from 'node-dependency-injection';
import { registerGithubRepositorysDependencys } from './GithubRepositorys_dependencys';
import { registerGithubIntegrationsSubscribersDependencys } from './subscribers_dependencys';

export function registerGithubIntegrationsDependencys(container: ContainerBuilder) {
  registerGithubRepositorysDependencys(container);
  registerGithubIntegrationsSubscribersDependencys(container);
}
