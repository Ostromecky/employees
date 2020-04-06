export class Employee {
  id: number;
  firstname: string;
  lastname: string;

  constructor(employee?: Employee) {
    if (employee) {
      this.id = employee.id;
      this.firstname = employee.firstname;
      this.lastname = employee.lastname;
    }
  }
}
