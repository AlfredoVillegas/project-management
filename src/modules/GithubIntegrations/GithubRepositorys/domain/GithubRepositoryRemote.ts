import { GithubRepositoryName } from './GithubRepositoryName';

export class GithubRepositoryRemote {
  constructor(readonly name: GithubRepositoryName, readonly description?: string) {}
}
