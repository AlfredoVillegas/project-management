import { EventBus } from '../../../Shared/domain/EventBus';
import { UserEmailAlreadyExists } from '../domain/Errors';
import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserId } from '../domain/UserId';
import { UserName } from '../domain/UserName';
import { UserRepository } from '../domain/UserRepository';

export type userRegisterParams = {
  id: string;
  githubId: number;
  name: string;
  email: string;
};

export class UserRegister {
  private repository: UserRepository;
  private eventBus: EventBus;

  constructor(repository: UserRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async run({ id, githubId, name, email }: userRegisterParams): Promise<void> {
    const userEmail = new UserEmail(email);

    if (await this.repository.userEmailAlreadyExist(userEmail)) {
      throw new UserEmailAlreadyExists(userEmail.value);
    }

    const user = User.register(new UserId(id), githubId, new UserName(name), userEmail);

    await this.repository.save(user);
    await this.eventBus.publish(user.extractDomainEvents());
  }
}
