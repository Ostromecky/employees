export class UserDto {
  id: number;
  firstName: string;
  lastName: string;
  isActive: boolean;

  constructor(user?: UserDto) {
    if (user) {
      this.id = user.id;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.isActive = user.isActive;
    }
  }
}
