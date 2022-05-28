import { GithubRepositoryLocalNotFound } from '../../domain/Errors';
import { GithubRepositoryLocalRepository } from '../../domain/GithubRepositoryLocalRepository';
import { GithubRepositoryRemoteRepository } from '../../domain/GithubRepositoryRemoteRepository';
import { getGithubCredential } from '../getGithubCredential';

export class ForkCreator {
  constructor(
    private remoteRepository: GithubRepositoryRemoteRepository,
    private localRepository: GithubRepositoryLocalRepository
  ) {}

  async execute({ userId, projectId }: { userId: string; projectId: string }): Promise<void> {
    // refactorizar a Query Bus
    const { githubToken, userName } = await getGithubCredential(userId);

    const githubRepositoryLocal = await this.localRepository.find(projectId);

    if (!githubRepositoryLocal) {
      throw new GithubRepositoryLocalNotFound(projectId);
    }

    const { name: repositoryName, creatorName: ownerName } = githubRepositoryLocal;

    const hasItForked = await this.hasItForked(githubToken, userName, repositoryName.value);

    if (!hasItForked) {
      return await this.remoteRepository.createFork(githubToken, { repositoryName: repositoryName.value, ownerName });
    }
  }

  private async hasItForked(githubToken: string, userName: string, repositoryName: string): Promise<boolean> {
    const githubRepositoryRemote = await this.remoteRepository.find(githubToken, {
      repositoryName,
      ownerName: userName
    });
    return githubRepositoryRemote != undefined;
  }
}
