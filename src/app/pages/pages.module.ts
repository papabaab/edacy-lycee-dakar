import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { RouterModule, Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { CourseService } from '../services/course/course.service';
import { HttpClientModule } from '@angular/common/http';
import { CourseResolver } from '../resolvers/course.resolver';



const routes: Routes = [{
  path: 'login',
  component: LoginComponent
},

{path: '', redirectTo: 'login', pathMatch: 'full'},
{
  path: 'courses',
  component: CoursesComponent,
  resolve: {
    courses: CourseResolver
  }
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
    CoursesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ...ANGULAR_MAT_MODUES
  ],
  exports: [
    LoginComponent,
    CoursesComponent,
  ],
  providers: [
    CourseService,
  ],
})
export class PagesModule { }
