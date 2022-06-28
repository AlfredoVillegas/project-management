import { DomainEvent } from '../../../Shared/domain/DomainEvent';

export class UserRegisterDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.register';
  readonly userId: string;
  readonly userName: string;
  readonly email: string;

  constructor(userId: string, name: string, email: string) {
    super(UserRegisterDomainEvent.EVENT_NAME, userId);
    this.userId = userId;
    this.userName = name;
    this.email = email;
  }
}
