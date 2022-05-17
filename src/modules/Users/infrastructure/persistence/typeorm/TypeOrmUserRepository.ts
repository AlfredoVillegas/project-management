import { getConnection, Repository } from 'typeorm';
import { User } from '../../../domain/User';
import { UserEmail } from '../../../domain/UserEmail';
import { UserId } from '../../../domain/UserId';
import { UserRepository } from '../../../domain/UserRepository';
import { UserSchema } from './UserSchema';

export class TypeOrmUserRepository implements UserRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getConnection().getRepository(UserSchema);
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async searchAll(): Promise<User[] | null | undefined> {
    const users = await this.repository.find();
    return users;
  }

  async findById(id: UserId): Promise<User | null> {
    const user = await this.repository.findOne({ id: id });

    return user || null;
  }

  async delete(id: UserId): Promise<void> {
    await this.repository.delete({ id: id });
  }

  async userEmailAlreadyExist(email: UserEmail): Promise<boolean> {
    const user = await this.repository.findOne({ email: email });

    return user !== undefined;
  }
}
