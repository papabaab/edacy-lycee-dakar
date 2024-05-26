import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { RouterModule, Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { CourseService } from '../services/course/course.abstract.service';
import { HttpClientModule } from '@angular/common/http';
import { CourseResolver } from '../resolvers/course.resolver';
import { authGuard } from '../shared/guards/auth.guard';
import { InscriptionComponent } from './inscription/inscription.component';
import { CourseServiceGraphQl } from '../services/course/course.graphql.service';
import { CourseServiceRest } from '../services/course/course.service';
import { environment } from 'src/environments/environment';



const routes: Routes = [{
  path: 'login',
  component: LoginComponent
},

{path: '', redirectTo: 'login', pathMatch: 'full'},
{
  path: 'courses',
  component: CoursesComponent,
  canActivate: [authGuard],
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
export function courseServiceFactory(isUsingGraphql: boolean) {
  return (restServ: CourseServiceRest, graphQlServ: CourseServiceGraphQl) => {
    if(isUsingGraphql) return graphQlServ
    else return restServ
  }
}

@NgModule({
  declarations: [
    LoginComponent,
    CoursesComponent,
    InscriptionComponent,
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
    CourseServiceGraphQl,
    CourseServiceRest,
    {
      provide: CourseService,
      useFactory: courseServiceFactory(environment.fromGraphQLApi),
      deps: [CourseServiceRest, CourseServiceGraphQl]
    }
  ],
})
export class PagesModule { }
