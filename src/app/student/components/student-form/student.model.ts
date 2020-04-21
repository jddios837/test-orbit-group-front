
export class Student
{
  // "Username":"juan",
	// "FirstName":"Juan",
	// "LastName":"Gomez",
	// "Age":32,
  // "Career":"Electrica"

  id: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  Age: number;
  Career: string;

  constructor(student?)
  {
    student = student || {};

    this.id = student.id || '';
    this.UserName = student.UserName || student.userName || '';
    this.FirstName = student.FirstName || student.firstName || '';
    this.LastName = student.LastName || student.lastName || '';
    this.Age = student.Age || student.age || 0;
    this.Career = student.Career || student.career || '';
  }

  getObjectModel() {
		return {
      UserName: this.UserName,
      FirstName: this.FirstName,
      LastName: this.LastName,
      Age: Number(this.Age),
      Career: this.Career
    }
  }

  getObjectUpdateModel() {
		return {
      Id: this.id,
      UserName: this.UserName,
      FirstName: this.FirstName,
      LastName: this.LastName,
      Age: Number(this.Age),
      Career: this.Career
    }
  }

  // "id": 3,
// "username": "juan",
// "firstName": "Juan",
// "lastName": "Gomez",
// "age": 32,
// "career": "Electrica"
}
