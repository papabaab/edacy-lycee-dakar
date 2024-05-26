
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Course } from 'src/app/models/course.interface';
import { Student } from 'src/app/models/student.interface';
import { CourseService as CourseService } from './course.abstract.service';
const api = environment.api



@Injectable({
  providedIn: 'root'
})
export class CourseServiceRest extends CourseService {



  constructor(private httpClient: HttpClient) {
    super()
   }




  override async getAllCourses(): Promise<Course[]> {
    console.log('REST SERVICE: GET ALL COURSES: ', this.allCourses)
    this.allCourses$ = this.httpClient.get<Course[]>(`${api}/courses`)
    return super.getAllCourses()
  }



  override async getStudentsInCourse(courseId: string|number): Promise<Student[]> {
    console.log('REST SERVICE: GET STUDENTS IN COURSE: ', courseId)
    this.allStudentsInCourse$ = this.httpClient.get<Student[]>(`${api}/courses/${courseId}/students`)
    return super.getStudentsInCourse(courseId)
  }





  override async editCourse(course: Course): Promise<Course[]> {
    console.log('REST SERVICE: EDIT COURSE: ', course)
    this.editCourse$ = this.httpClient.put<Course>(`${api}/courses/${course.courseId}`, course)
   return super.editCourse(course)
  }





  override async addCourse(course: Course): Promise<Course> {
    console.log('REST SERVICE: ADD COURSE: ', course)
    this.addCourse$ = this.httpClient.post<Course>(`${api}/courses`, course)
    return super.addCourse(course)
  }




  override async deleteSelectedCourse(course: Course): Promise<Course[]> {
    console.log('REST SERVICE: DELETE COURSE: ', course)
    this.deleteSelectedCourse$ = this.httpClient.delete<Course>(`${api}/courses/${course.courseId}`)
    return super.deleteSelectedCourse(course)
  }



  override async editStudent(student: Student): Promise<Course[]> {
    console.log('REST SERVICE: EDIT STUDENT: ', student)
    this.editStudent$ = this.httpClient.put<Student>(`${api}/courses/${student.courseId}/students/${student.studentId}`,student)
    return super.editStudent(student)
  }




  override async addStudentToCourse(student: Student): Promise<Student> {
    console.log('REST SERVICE: ADD STUDENT IN COURSE: ', student)
    this.addStudentToCourse$ = this.httpClient.post<Student>(`${api}/courses/${student.courseId}/students`, student)
    return super.addStudentToCourse(student)
  }






  override async deleteStudentFromCourse(student: Student): Promise<Course[]> {
    console.log('REST SERVICE: DELETE STUDENT IN COURSE: ', student)
    this.deleteStudentFromCourse$ = this.httpClient.delete<Student>(`${api}/courses/${student.courseId}/students/${student.studentId}`)
    return super.deleteStudentFromCourse(student)
  }

}
