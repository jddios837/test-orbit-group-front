
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';

import { StudentFormComponent } from './components/student-form/student-form.component';
import { FormGroup } from '@angular/forms';
import { Student } from './components/student-form/student.model';
import { StudentService } from 'app/student/services/student.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {


  constructor(
    public dialog: MatDialog,
    private studentservice: StudentService,
    private _matSnackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }



}
