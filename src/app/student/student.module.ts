import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';


import { StudentComponent } from './student.component';
import { StudentListComponent } from './components/student-list/student-list.component';

import { StudentService } from './services/student.service';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";

const routes = [
  {
      path     : '',
      component: StudentComponent
  }
];

@NgModule({
  declarations: [
    StudentComponent,
    StudentListComponent,
    StudentFormComponent,
    ConfirmDialogComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,

    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    FlexLayoutModule,
    MatTableModule
  ],
  providers : [
    StudentService
  ],
  entryComponents: [
    ConfirmDialogComponent,
    StudentFormComponent
  ]
})
export class StudentModule { }
