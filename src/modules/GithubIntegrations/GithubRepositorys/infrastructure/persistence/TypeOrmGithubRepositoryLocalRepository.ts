import { getConnection, Repository } from 'typeorm';
import { GithubRepositoryLocal } from '../../domain/GithubRepositoryLocal';
import { GithubRepositoryLocalRepository } from '../../domain/GithubRepositoryLocalRepository';
import { GithubRepositoryLocalSchema } from './TypeOrm/GithubRepositoryLocalEntity';

export class TypeOrmGithubRepositoryLocalRepository implements GithubRepositoryLocalRepository {
  private repository: Repository<GithubRepositoryLocal>;
  constructor() {
    this.repository = getConnection().getRepository(GithubRepositoryLocalSchema);
  }
  async save(githubRepositoryLocal: GithubRepositoryLocal): Promise<void> {
    await this.repository.save(githubRepositoryLocal);
  }

  async find(projectId: string): Promise<GithubRepositoryLocal | undefined | null> {
    return await this.repository.findOne({ projectId });
  }
}
