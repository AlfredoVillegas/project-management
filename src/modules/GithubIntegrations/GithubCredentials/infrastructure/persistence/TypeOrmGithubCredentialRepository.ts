import { getConnection, Repository } from 'typeorm';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { GithubCredential } from '../../domain/GithubCredential';
import { GithubCredentialRepository } from '../../domain/GithubCredentialRepository';
import { GithubCredentialsEntity } from './typeorm/GithubCredentialsEntity';

export class TypeOrmProjectRepository implements GithubCredentialRepository {
  private repository: Repository<GithubCredential>;
  constructor() {
    this.repository = getConnection().getRepository(GithubCredentialsEntity);
  }
  async findByUser(userId: Uuid): Promise<GithubCredential | null | undefined> {
    return await this.repository.findOne({ userId });
  }
}
