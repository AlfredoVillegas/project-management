import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { GithubCredentialNotExist } from '../domain/Errors';
import { GithubCredentialRepository } from '../domain/GithubCredentialRepository';

export class GithubCredentialTokenUpdater {
  constructor(private repository: GithubCredentialRepository) {}

  public async execute(userId: Uuid, githubToken: string): Promise<void> {
    const githubCredential = await this.repository.findByUser(userId);

    if (!githubCredential) {
      throw new GithubCredentialNotExist(userId.value);
    }

    await this.repository.updateToken(githubCredential.userId, githubToken);
  }
}
