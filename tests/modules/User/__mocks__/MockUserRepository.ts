import { Uuid } from '../../../../src/modules/Shared/domain/value-object/Uuid';
import { userRegisterParams } from '../../../../src/modules/Users/application/UserRegister';
import { User } from '../../../../src/modules/Users/domain/User';
import { UserEmail } from '../../../../src/modules/Users/domain/UserEmail';
import { UserId } from '../../../../src/modules/Users/domain/UserId';
import { UserName } from '../../../../src/modules/Users/domain/UserName';
import { UserRepository } from '../../../../src/modules/Users/domain/UserRepository';

export class MockUserRepository implements UserRepository {
  private userDomain: User | null = null;

  public userDataPlainForTest = {
    id: Uuid.random().value,
    githubId: 112255632,
    name: 'Example Name',
    email: 'example@example.com'
  };

  static CreateUserDomainEntity(user: userRegisterParams): User {
    return new User(new UserId(user.id), user.githubId, new UserName(user.name), new UserEmail(user.email));
  }

  save(user: User): Promise<void> {
    this.userDomain = user;
    return Promise.resolve();
  }
  search(id: UserId): Promise<User | null> {
    if (this.userDomain?.id.value === id.value) {
      return Promise.resolve(this.userDomain);
    }
    return Promise.resolve(null);
  }
  delete(id: UserId): Promise<void> {
    this.userDomain = null;
    return Promise.resolve();
  }

  async findById(id: UserId): Promise<User | null> {
    if (this.userDomain?.id.value === id.value) {
      return this.userDomain;
    }
    return null;
  }

  async searchAll(): Promise<User[] | null | undefined> {
    return this.userDomain ? [this.userDomain] : null;
  }

  async userEmailAlreadyExist(email: UserEmail): Promise<boolean> {
    return this.userDomain?.email.value === email.value;
  }
}
