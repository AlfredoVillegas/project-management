import axios from 'axios';
import { GithubRepositoryName } from '../domain/GithubRepositoryName';
import { GithubRepositoryRemote } from '../domain/GithubRepositoryRemote';
import { GithubRepositoryRemoteRepository } from '../domain/GithubRepositoryRemoteRepository';

export class ApiGithubRepositoryRemoteRepository implements GithubRepositoryRemoteRepository {
  async create(accessToken: string, githubRepository: GithubRepositoryRemote): Promise<void> {
    const dataGithubRepository = { name: githubRepository.name.value, description: githubRepository.description };

    await axios.post(`https://api.github.com/user/repos`, dataGithubRepository, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${accessToken}`
      }
    });
  }

  async find(
    accessToken: string,
    { repositoryName, ownerName }: { repositoryName: string; ownerName: string }
  ): Promise<GithubRepositoryRemote | undefined | null> {
    const response = await axios.get(`https://api.github.com/repos/${ownerName}/${repositoryName}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${accessToken}`
      }
    });

    if (!response.data.id) {
      return undefined;
    }

    const githubRepositoryRemote = new GithubRepositoryRemote(
      new GithubRepositoryName(response.data.name),
      response.data.description
    );

    return githubRepositoryRemote;
  }

  async createFork(
    accessToken: string,
    { repositoryName, ownerName }: { repositoryName: string; ownerName: string }
  ): Promise<void> {
    await axios.post(`https://api.github.com/repos/${ownerName}/${repositoryName}/forks`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${accessToken}`
      }
    });
  }

  createBranch(accesToken: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
