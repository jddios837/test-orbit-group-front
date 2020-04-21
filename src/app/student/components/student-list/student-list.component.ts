import { Component, OnInit } from '@angular/core';
import { StudentService } from 'app/student/services/student.service';
import { Observable } from 'rxjs';

import { Student as IStudent } from '../../interfaces/student.interface';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentFormComponent } from '../student-form/student-form.component';
import { Student } from '../student-form/student.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: Observable<IStudent[]>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  studentFormDialogRef: MatDialogRef<StudentFormComponent>;

  displayedColumns: string[] = ['id', 'userName', 'firstName', 'lastName', 'age', 'career', 'options'];


  constructor(
    private studentservice: StudentService,
    public dialog: MatDialog,
    private _matSnackBar: MatSnackBar,
  ) {

  }

  reloadData() {
    this.students = this.studentservice.getStudentList();
  }

  ngOnInit() {
    this.reloadData();
  }

  deleteStudent(id) {
    console.log('Delete ', id);
    this.confirmDialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?";

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Delete ');
        this.studentservice.deleteStudent(id).subscribe(
          () => {
            this._matSnackBar.open('Student deleted', 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
            this.reloadData();
          },
          (e) => {
            this._matSnackBar.open('Error to deleted', 'Error', {
              verticalPosition: 'top',
              duration: 2000
            });
          }
        );

      }
      this.confirmDialogRef = null;
    });
  }

  editStudent(id) {
    this.studentservice.getStudent(id).subscribe(data => {
      let student: Student = new Student(data);
      console.log('student ', student.getObjectUpdateModel());

      this.studentFormDialogRef = this.dialog.open(
        StudentFormComponent,
        {
          width: '350px',
          data: {
            action: "edit",
            id: id,
            student: student.getObjectUpdateModel()
          },
          disableClose: false
        });

      this.studentFormDialogRef.afterClosed().subscribe((response: FormGroup) => {
        if (!response) {
          return;
        }
        let student: Student = new Student(response.getRawValue());
        student.id = id;
        this.studentservice.updateStudent(id, student.getObjectUpdateModel()).subscribe(
          () => {
            this._matSnackBar.open('Student updated', 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
            this.reloadData();
          },
          (err) => {
            this._matSnackBar.open('Error to update student, try again', 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          }
        );
      });
    });
  }

  addNewStudent() {
    this.studentFormDialogRef = this.dialog.open(
      StudentFormComponent,
      {
        width: '350px',
        data: {
          action: "new"
        },
        disableClose: false
      });

    this.studentFormDialogRef.afterClosed().subscribe((response: FormGroup) => {
      if (!response) {
        return;
      }
      let student: Student = new Student(response.getRawValue());
      this.studentservice.createStudent(student.getObjectModel()).subscribe(
        () => {
          this._matSnackBar.open('Student added', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
          this.reloadData();
        },
        (err) => {
          this._matSnackBar.open('Error to add student, try again', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        }
      );
    });

  }

}
