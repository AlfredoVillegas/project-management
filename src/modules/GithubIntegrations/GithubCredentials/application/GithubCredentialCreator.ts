import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { GithubCredential } from '../domain/GithubCredential';
import { GithubCredentialRepository } from '../domain/GithubCredentialRepository';
import { GithubCredentialUserName } from '../domain/GithubCredentialUserName';

interface GithubCredentialCreatorParams {
  userId: Uuid;
  userName: string;
  githubAccessToken: string;
}

export class GithubCredentialCreator {
  constructor(private repository: GithubCredentialRepository) {}

  async execute({ userId, userName, githubAccessToken }: GithubCredentialCreatorParams): Promise<void> {
    const githubCredentialUserName = new GithubCredentialUserName(userName);
    const credential = new GithubCredential(userId, githubCredentialUserName, githubAccessToken);

    await this.repository.save(credential);
  }
}
