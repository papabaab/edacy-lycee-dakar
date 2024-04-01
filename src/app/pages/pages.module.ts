import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ClassesComponent } from './classes/classes.component';
import { RouterModule, Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { StudentFormComponent } from './student-form/student-form.component';
import { CourseFormComponent } from './course-form/course-form.component';



const routes: Routes = [{
  path: 'login',
  component: LoginComponent
},

{path: '', redirectTo: 'login', pathMatch: 'full'},
{
  path: 'classes',
  component: ClassesComponent
},

]

@NgModule({
  declarations: [
    LoginComponent,
    CourseFormComponent,
    ClassesComponent,
    StudentFormComponent,
    CourseFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    LoginComponent,
    ClassesComponent,
    CourseFormComponent,
    StudentFormComponent,
  ]
})
export class PagesModule { }
