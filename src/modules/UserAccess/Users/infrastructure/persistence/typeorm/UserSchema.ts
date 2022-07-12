import { EntitySchema } from 'typeorm';
import { User } from '../../../domain/User';
import { UserEmail } from '../../../domain/UserEmail';
import { UserId } from '../../../domain/UserId';
import { UserName } from '../../../domain/UserName';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  schema: 'users_access',

  columns: {
    id: {
      type: String,
      primary: true,
      transformer: {
        from: (value: string): UserId => new UserId(value),
        to: (value: UserId): string => value.value
      }
    },
    githubId: {
      type: Number,
      unique: true,
      name: 'github_id'
    },
    name: {
      type: String,
      transformer: {
        from: (value: string): UserName => new UserName(value),
        to: (value: UserName): string => value.value
      }
    },
    email: {
      type: String,
      unique: true,
      transformer: {
        from: (value: string): UserEmail => new UserEmail(value),
        to: (value: UserEmail): string => value.value
      }
    }
  }
});
