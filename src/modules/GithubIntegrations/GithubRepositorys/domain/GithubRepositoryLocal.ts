import { GithubRepositoryName } from './GithubRepositoryName';

export class GithubRepositoryLocal {
  constructor(readonly projectId: string, readonly name: GithubRepositoryName, readonly creatorName: string) {}
}
