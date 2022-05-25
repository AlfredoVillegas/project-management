export class GithubCredentialUserName {
  readonly value: string;
  constructor(userName: string) {
    this.value = this.adaptUserNameForGithub(userName);
  }

  private adaptUserNameForGithub(userName: string): string {
    const spaces = / /g;
    return userName.replace(spaces, '');
  }
}
