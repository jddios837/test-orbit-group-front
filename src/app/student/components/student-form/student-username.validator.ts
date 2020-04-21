import { StudentService } from 'app/student/services/student.service';
import { map, take, debounceTime, catchError } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';

import * as _ from 'lodash';

export class StudentCustomValidator {
  static usernameExist(studentService: StudentService) {
    return (control: AbstractControl) => {
        const username = control.value;
        console.log('username Validation', username);


        return studentService.checkUserName(username).pipe(
          map(
              (response: Response) => {
                  return { userNameExist: true };
              },
          ),
          catchError(
              (err: any) => {
                  return null;
              },
          )
        );
        // return _afa.db.collection('users', ref => ref.where('email', '==', email))
        //     .valueChanges().pipe(
        //         debounceTime(500),
        //         take(1),
        //         map(arr => arr.length ? { emailExist: true } : null),
        //     )
    };
  }
}
