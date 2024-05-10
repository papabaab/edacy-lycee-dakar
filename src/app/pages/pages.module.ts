import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { RouterModule, Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { StudentFormComponent } from './student-form/student-form.component';
import { CourseFormComponent } from './course-form/course-form.component';
import {MatInputModule} from '@angular/material/input';



const routes: Routes = [{
  path: 'login',
  component: LoginComponent
},

{path: '', redirectTo: 'login', pathMatch: 'full'},
{
  path: 'courses',
  component: CoursesComponent
},

]

const ANGULAR_MAT_MODUES = [
  MatIconModule,
  MatCardModule,
  MatInputModule
]

@NgModule({
  declarations: [
    LoginComponent,
    CourseFormComponent,
    CoursesComponent,
    StudentFormComponent,
    CourseFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ...ANGULAR_MAT_MODUES
  ],
  exports: [
    LoginComponent,
    CoursesComponent,
    CourseFormComponent,
    StudentFormComponent,
  ]
})
export class PagesModule { }
