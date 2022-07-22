import { UserRegister } from '../../../../src/modules/UserAccess/Users/application/UserRegister';
import { UserEmailAlreadyExists } from '../../../../src/modules/UserAccess/Users/domain/Errors';
import { UserId } from '../../../../src/modules/UserAccess/Users/domain/UserId';
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

    const userExist = await userRepository.findById(new UserId(userRepository.userDataPlainForTest.id));
    expect(userExist?.toPrimitives()).toEqual(userRepository.userDataPlainForTest);
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
