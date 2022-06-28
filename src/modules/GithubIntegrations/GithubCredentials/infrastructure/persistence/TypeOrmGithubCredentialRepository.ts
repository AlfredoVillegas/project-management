import { getConnection, Repository } from 'typeorm';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { GithubCredential } from '../../domain/GithubCredential';
import { GithubCredentialRepository } from '../../domain/GithubCredentialRepository';
import { GithubCredentialsEntity } from './typeorm/GithubCredentialsEntity';

export class TypeOrmGithubCredentialRepository implements GithubCredentialRepository {
  private repository: Repository<GithubCredential>;
  constructor() {
    this.repository = getConnection().getRepository(GithubCredentialsEntity);
  }

  async save(githubCredential: GithubCredential): Promise<void> {
    await this.repository.save(githubCredential);
  }

  async findByUser(userId: Uuid): Promise<GithubCredential | null | undefined> {
    return await this.repository.findOne({ userId });
  }

  async updateToken(userId: Uuid, githubToken: string): Promise<void> {
    await this.repository.update({ userId: userId }, { githubToken });
  }
}
