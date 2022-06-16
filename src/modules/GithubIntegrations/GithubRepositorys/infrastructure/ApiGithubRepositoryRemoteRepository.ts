import axios, { AxiosError, AxiosResponse } from 'axios';
import { GithubRepositoryName } from '../domain/GithubRepositoryName';
import { GithubRepositoryRemote } from '../domain/GithubRepositoryRemote';
import { GithubRepositoryRemoteRepository } from '../domain/GithubRepositoryRemoteRepository';

export class ApiGithubRepositoryRemoteRepository implements GithubRepositoryRemoteRepository {
  private apiUrl = `https://api.github.com`;

  private getConfig(accessToken: string) {
    return {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${accessToken}`
      }
    };
  }

  async create(accessToken: string, githubRepository: GithubRepositoryRemote): Promise<void> {
    const dataGithubRepository = {
      name: githubRepository.name.value,
      description: githubRepository.description,
      auto_init: true
    };

    await axios.post(`${this.apiUrl}/user/repos`, dataGithubRepository, this.getConfig(accessToken));
  }

  async find(
    accessToken: string,
    { repositoryName, ownerName }: { repositoryName: string; ownerName: string }
  ): Promise<GithubRepositoryRemote | undefined> {
    let response: AxiosResponse<any, any>;
    try {
      response = await axios.get(`${this.apiUrl}/repos/${ownerName}/${repositoryName}`, this.getConfig(accessToken));

      const githubRepositoryRemote = new GithubRepositoryRemote(
        new GithubRepositoryName(response.data.name),
        response.data.description
      );
      return githubRepositoryRemote;
    } catch (error) {
      if (error instanceof AxiosError) return undefined;
    }
  }

  async createFork(
    accessToken: string,
    { repositoryName, ownerName }: { repositoryName: string; ownerName: string }
  ): Promise<void> {
    await axios.post(
      `${this.apiUrl}/repos/${ownerName}/${repositoryName}/forks`,
      undefined,
      this.getConfig(accessToken)
    );
  }
}
