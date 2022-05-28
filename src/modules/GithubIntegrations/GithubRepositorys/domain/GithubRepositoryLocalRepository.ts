import { GithubRepositoryLocal } from './GithubRepositoryLocal';

export interface GithubRepositoryLocalRepository {
  save(githubRepository: GithubRepositoryLocal): Promise<void>;
  find(projectId: string): Promise<GithubRepositoryLocal | undefined | null>;
}
