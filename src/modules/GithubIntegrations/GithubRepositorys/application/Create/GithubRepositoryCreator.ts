import { GithubRepositoryLocal } from '../../domain/GithubRepositoryLocal';
import { GithubRepositoryLocalRepository } from '../../domain/GithubRepositoryLocalRepository';
import { GithubRepositoryName } from '../../domain/GithubRepositoryName';
import { GithubRepositoryRemote } from '../../domain/GithubRepositoryRemote';
import { GithubRepositoryRemoteRepository } from '../../domain/GithubRepositoryRemoteRepository';
import { getGithubCredential } from '../getGithubCredential';

interface GithubRepositoryCreatorParams {
  creator: string;
  name: string;
  description?: string;
  projectId: string;
}

export class GithubRepositoryCreator {
  constructor(
    private remoteRepository: GithubRepositoryRemoteRepository,
    private localRepository: GithubRepositoryLocalRepository
  ) {}

  async execute({ name, description, creator, projectId }: GithubRepositoryCreatorParams): Promise<void> {
    // refactorizar a Query Bus
    const { userName: creatorName, githubToken } = await getGithubCredential(creator);

    name = this.adaptNameForGithub(name);
    const repositoryName = new GithubRepositoryName(name);

    const githubRepositoryLocal = new GithubRepositoryLocal(projectId, repositoryName, creatorName);

    const githubRepositoryRemote = new GithubRepositoryRemote(repositoryName, description);

    await this.remoteRepository.create(githubToken, githubRepositoryRemote);

    return await this.localRepository.save(githubRepositoryLocal);
  }

  private adaptNameForGithub(value: string): string {
    return value.replace(/ /g, '-');
  }
}
