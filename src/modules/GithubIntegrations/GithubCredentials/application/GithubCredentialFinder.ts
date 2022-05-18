import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { GithubCredentialNotExist } from '../domain/Errors';
import { GithubCredential } from '../domain/GithubCredential';
import { GithubCredentialRepository } from '../domain/GithubCredentialRepository';

export class GithubCredentialFinder {
  constructor(private repository: GithubCredentialRepository) {}

  public async execute(userId: Uuid): Promise<GithubCredential> {
    const githubCredential = await this.repository.findByUser(userId);

    if (!githubCredential) {
      throw new GithubCredentialNotExist(userId.value);
    }

    return githubCredential;
  }
}
