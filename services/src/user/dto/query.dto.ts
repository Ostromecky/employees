export class QueryDto {
  firstName: string;
  lastName: string;
  isActive: boolean;
  take: number;
  skip: number;

  constructor(query?: QueryDto) {
    if (query) {
      this.firstName = query.firstName;
      this.lastName = query.lastName;
      this.isActive = query.isActive;
      this.take = query.take;
      this.skip = query.skip;
    }
  }
}
