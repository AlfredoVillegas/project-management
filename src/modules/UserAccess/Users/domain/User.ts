import { DomainEntity } from '../../../Shared/domain/Entity';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserName } from './UserName';
import { UserRegisterDomainEvent } from './UserRegisterDomainEvent';

export class User extends DomainEntity {
  readonly id: UserId;
  readonly githubId: number;
  readonly name: UserName;
  readonly email: UserEmail;

  constructor(id: UserId, githubId: number, name: UserName, email: UserEmail) {
    super();
    this.id = id;
    this.githubId = githubId;
    this.name = name;
    this.email = email;
  }

  static register(id: UserId, githubId: number, name: UserName, email: UserEmail): User {
    const user = new User(id, githubId, name, email);

    user.addDomainEvent(new UserRegisterDomainEvent(id.value, name.value, email.value));

    return user;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      githubId: this.githubId,
      name: this.name.value,
      email: this.email.value
    };
  }
}
