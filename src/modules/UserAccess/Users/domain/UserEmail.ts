export class UserEmail {
  readonly value: string;

  constructor(email: string) {
    this.validate(email.toLowerCase());
    this.value = email.toLowerCase();
  }

  private validate(email: string) {
    //
  }
}
