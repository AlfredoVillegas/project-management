import { GithubRepositoryRemote } from './GithubRepositoryRemote';

export interface GithubRepositoryRemoteRepository {
  create(accesToken: string, githubRepository: GithubRepositoryRemote): Promise<void>;
  find(
    accesToken: string,
    { repositoryName, ownerName }: { repositoryName: string; ownerName: string }
  ): Promise<GithubRepositoryRemote | undefined | null>;
  createFork(
    accesToken: string,
    { repositoryName, ownerName }: { repositoryName: string; ownerName: string }
  ): Promise<void>;
  createBranch(accesToken: string): Promise<void>;
}
