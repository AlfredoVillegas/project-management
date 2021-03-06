import { UserDeleter } from '../../../../src/modules/UserAccess/Users/application/UserDeleter';
import { UserId } from '../../../../src/modules/UserAccess/Users/domain/UserId';
import { MockUserRepository } from '../__mocks__/MockUserRepository';

let userDeleter: UserDeleter;
let userRepository: MockUserRepository;

beforeEach(() => {
  userRepository = new MockUserRepository();
  userRepository.save(MockUserRepository.CreateUserDomainEntity(userRepository.userDataPlainForTest));
  userDeleter = new UserDeleter(userRepository);
});

//afterEach(() => {});

describe('Test od UserDeleter', () => {
  it('should deleter user', async () => {
    await userDeleter.run(userRepository.userDataPlainForTest.id);
    const userInDB = await userRepository.findById(new UserId(userRepository.userDataPlainForTest.id));
    expect(userInDB).toBeNull();
  });
});
