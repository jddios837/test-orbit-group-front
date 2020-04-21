import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Student } from './student.model';

import { StudentCustomValidator } from "./student-username.validator";
import { StudentService } from 'app/student/services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentFormComponent implements OnInit {
  studend: Student;
  pageType: string;
  studentForm: FormGroup;
  action: string;
  originalUserName;

  careers = [
    'Civil Engineer',
    'Chemical Engineer',
    'Agricultural Engineer',
    'Automotive Engineer',
  ];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<StudentFormComponent>,
    private studentservice: StudentService,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {
    this.action = _data.action;

    if (this.action === 'edit') {
      this.studend = new Student(_data.student);
    } else {
      this.studend = new Student();
    }

  }

  ngOnInit() {

    this.studentForm = this.createCandidateForm();

    if (this.action == 'edit') {

      this.originalUserName = this.studend.UserName;
      console.log('User name original ', this.originalUserName);


      this.studentForm.get('UserName').valueChanges.subscribe((value) => {
          // init validators
          if (this.originalUserName == value) {
              console.log('UserName es el mismo del input ', this.originalUserName, value);
              this.userNameControl.setValidators([
                  Validators.required
              ]);
              this.userNameControl.setAsyncValidators(null);
          } else {
              this.userNameControl.setValidators([
                  Validators.required
              ]);
              this.userNameControl.setAsyncValidators([
                StudentCustomValidator.usernameExist(this.studentservice)
              ]);
          }

          this.studentForm.updateValueAndValidity();
      })
  } else {
      this.userNameControl.setAsyncValidators([
        StudentCustomValidator.usernameExist(this.studentservice)
      ]);

      this.studentForm.updateValueAndValidity();
  }
  }

  createCandidateForm(): FormGroup
  {
      return this.formBuilder.group({
          id              : [this.studend.id],
          UserName            : [this.studend.UserName, [ Validators.required ]],
          FirstName       : [this.studend.FirstName, [ Validators.required ]],
          LastName        : [this.studend.LastName, [ Validators.required ]],
          Age             : [this.studend.Age, [ Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
          Career          : [this.studend.Career, [ Validators.required ]],
      });
  }

  get userNameControl() {
      return this.studentForm.get('UserName') as FormControl;
  }

  inputControl(input: string) {
      return this.studentForm.get(input) as FormControl;
  }
}
