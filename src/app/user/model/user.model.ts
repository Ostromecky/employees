export class User {
  id: number;
  firstname: string;
  lastname: string;

  constructor(user?: User) {
    if (user) {
      this.id = user.id;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
    }
  }
}
