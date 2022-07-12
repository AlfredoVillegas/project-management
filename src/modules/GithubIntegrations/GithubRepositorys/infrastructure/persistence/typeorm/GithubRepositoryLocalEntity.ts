import { EntitySchema } from 'typeorm';
import { GithubRepositoryLocal } from '../../../domain/GithubRepositoryLocal';
import { GithubRepositoryName } from '../../../domain/GithubRepositoryName';

export const GithubRepositoryLocalSchema = new EntitySchema<GithubRepositoryLocal>({
  name: 'GithubRepositoryLocal',
  tableName: 'github_repository_info',
  target: GithubRepositoryLocal,
  schema: 'github_integrations',

  columns: {
    projectId: {
      type: String,
      primary: true
      //transformer: UuidTransformerOrm
    },
    name: {
      type: String,
      transformer: {
        from: (value: string): GithubRepositoryName => new GithubRepositoryName(value),
        to: (value: GithubRepositoryName): string => value.value
      }
    },
    creatorName: {
      type: String
    }
  }
});
