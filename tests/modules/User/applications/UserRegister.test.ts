import { UserRegister } from '../../../../src/modules/Users/application/UserRegister';
import { UserEmailAlreadyExists } from '../../../../src/modules/Users/domain/Errors';
import { User } from '../../../../src/modules/Users/domain/User';
import { UserId } from '../../../../src/modules/Users/domain/UserId';
import { MockEventBus } from '../__mocks__/MockEventBus';
import { MockUserRepository } from '../__mocks__/MockUserRepository';

let userRepository: MockUserRepository;
let userRegister: UserRegister;
let eventBus: MockEventBus;

beforeEach(() => {
  eventBus = new MockEventBus();
  userRepository = new MockUserRepository(); // //new InMemoryUserRepository();
  userRegister = new UserRegister(userRepository, eventBus);
});

describe('Test of UserRegister', () => {
  it('should create a valid user', async () => {
    await userRegister.run(userRepository.userDataPlainForTest);

    const userExist = await userRepository.search(new UserId(userRepository.userDataPlainForTest.id));

    expect(userExist).toBeInstanceOf(User);
    expect(userExist?.id.value).toEqual(userRepository.userDataPlainForTest.id);
    expect(eventBus.getCallsToPublishEvent()).toEqual(1);
  });

  it('should throw an error when the user email already exists', async () => {
    await userRegister.run(userRepository.userDataPlainForTest);
    expect.assertions(1);

    try {
      await userRegister.run(userRepository.userDataPlainForTest);
    } catch (e) {
      expect(e).toBeInstanceOf(UserEmailAlreadyExists);
    }
  });
});
