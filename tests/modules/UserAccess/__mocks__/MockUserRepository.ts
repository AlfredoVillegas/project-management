import { Uuid } from '../../../../src/modules/Shared/domain/value-object/Uuid';
import { userRegisterParams } from '../../../../src/modules/UserAccess/Users/application/UserRegister';
import { User } from '../../../../src/modules/UserAccess/Users/domain/User';
import { UserEmail } from '../../../../src/modules/UserAccess/Users/domain/UserEmail';
import { UserId } from '../../../../src/modules/UserAccess/Users/domain/UserId';
import { UserName } from '../../../../src/modules/UserAccess/Users/domain/UserName';
import { UserRepository } from '../../../../src/modules/UserAccess/Users/domain/UserRepository';

export class MockUserRepository implements UserRepository {
  private mockSave = jest.fn();

  async save(user: User): Promise<void> {
    this.mockSave(user);
  }

  async findById(id: UserId): Promise<User | null> {
    const lastSavedUser = this.mockSave.mock.calls[this.mockSave.mock.calls.length - 1][0] as User;
    return lastSavedUser;
  }

  searchAll(): Promise<User[] | null | undefined> {
    throw new Error('Method not implemented.');
  }

  async delete(id: UserId): Promise<void> {
    this.mockSave.mock.calls[this.mockSave.mock.calls.length - 1][0] = null;
  }

  async userEmailAlreadyExist(email: UserEmail): Promise<boolean> {
    const lastCallMockSave = this.mockSave.mock.calls[this.mockSave.mock.calls.length - 1];
    if (!lastCallMockSave) {
      return false;
    }

    const lastSavedUser = lastCallMockSave[0];
    return lastSavedUser.email.value === email.value;
  }

  public userDataPlainForTest = {
    id: Uuid.random().value,
    githubId: 112255632,
    name: 'Example Name',
    email: 'example@example.com'
  };

  static CreateUserDomainEntity(user: userRegisterParams): User {
    return new User(new UserId(user.id), user.githubId, new UserName(user.name), new UserEmail(user.email));
  }
}
