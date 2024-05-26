
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, map, of, tap } from 'rxjs';
import { Course } from 'src/app/models/course.interface';
import { Student } from 'src/app/models/student.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class CourseService {

allCourses!: Course[]
allCourses$!: Observable<Course[]>
allStudentsInCourse$!: Observable<Student[]>
editCourse$!: Observable<Course>
addCourse$!: Observable<Course>
deleteSelectedCourse$!: Observable<Course>
editStudent$!: Observable<Student>
addStudentToCourse$!: Observable<Student>
deleteStudentFromCourse$!: Observable<Student>

  async getAllCourses(): Promise<Course[]>{
    const courses =  await firstValueFrom(this.allCourses$
      .pipe(tap((data) => console.log('SERVICE: ALL COURSES FROM API: ', data)),
            map((data: any) => data.map((e:Course)=>{
            e.startDate = this.formatDate(e.startDate)
            e.endDate = this.formatDate(e.endDate)
            return e
    }) as Course[]),
    catchError((err: HttpErrorResponse) => this.handleError(err))))
    console.log('SERVICE: ALL COURSES FROM API: ', courses)
    this.allCourses = courses
    return courses
  }

  async getStudentsInCourse(courseId: string|number): Promise<Student[]> {
    console.log('SERVICE: getStudentsInCourse: ', courseId)
    return await firstValueFrom(this.allStudentsInCourse$
      .pipe(tap((data) => console.log('SERVICE: ALL STUDENTS FROM API: ', data)),
            map((data: any) => data.map((e:Course)=>{return e}) as Student[]),
            catchError((err: HttpErrorResponse) => this.handleError(err))))
  }
  async editCourse(course: Course): Promise<Course[]>{
    console.log('SERVICE: ADMIN WANTS TO EDIT A COURSE: ', course)
    const result = await firstValueFrom(this.editCourse$
    .pipe(tap((data) => console.log('SERVICE: Course edited: ', data)),
    catchError((err: HttpErrorResponse) => this.handleError(err))))
    this.allCourses = this.allCourses.filter(e=>e.courseId !== course.courseId)
    this.allCourses.push(result as Course)
    return this.allCourses
  }
  async addCourse(course: Course): Promise<Course>{
    console.log('SERVICE: ADMIN WANTS TO ADD A COURSE: ', course)
    const result = await firstValueFrom(this.addCourse$
      .pipe(tap((data) => console.log('SERVICE: Course added: ', data)),
      map((data:any) => data as Course),
      catchError((err: HttpErrorResponse) => this.handleError(err))))
      this.allCourses.push(result as Course)
      return result as Course
  }
  async deleteSelectedCourse(course: Course): Promise<Course[]>{
    console.log('SERVICE: ADMIN WANTS TO DELETE A COURSE: ', course)
    this.allCourses = this.allCourses.filter(e=>e.courseId !== course.courseId)
    const result = await firstValueFrom(this.deleteSelectedCourse$
    .pipe(tap((data) => console.log('SERVICE: Course deleted: ', data)),
    catchError((err: HttpErrorResponse) => this.handleError(err))))
    console.log('SERVICE: ADMIN WANTS TO DELETE A COURSE: ', result)
    return this.allCourses
  }

  async editStudent(student: Student): Promise<Course[]>{
    console.log('SERVICE: ADMIN WANTS TO EDIT A STUDENT: ', student)

      const ind = this.allCourses.indexOf(this.allCourses.find(e=>e.courseId == student.courseId) as Course)
      this.allCourses[ind].students = this.allCourses[ind]?.students?.filter(e=>e.studentId !== student.studentId)
      this.allCourses[ind]?.students?.push(student)



    const result = await firstValueFrom(this.editStudent$
                            .pipe(tap((data) => console.log('SERVICE: student edited: ', data)),
                            catchError((err: HttpErrorResponse) => this.handleError(err)))
                          )

    console.log('SERVICE: ADMIN EDITED A STUDENT: ', result)

    return this.allCourses
  }
  async addStudentToCourse(student: Student): Promise<Student>{

    console.log('SERVICE: ADMIN WANTS TO ADD A STUDENT TO A COURSE: ', student)

    const result = await firstValueFrom(this.addStudentToCourse$
    .pipe(tap((data) => console.log('SERVICE: student added: ', data)),
    map((data:any) => data as Student),
    catchError((err: HttpErrorResponse) => this.handleError(err))))
    console.log('SERVICE: ADMIN ADDED A NEW STUDENT TO COURSE: ', result)
    return result as Student
  }
  async deleteStudentFromCourse(student: Student): Promise<Course[]>{
    const ind = this.allCourses.indexOf(this.allCourses.find(e=>e.courseId == student.courseId) as Course)
    this.allCourses[ind].students = this.allCourses[ind].students?.filter(e=>e.studentId !== student.studentId)

 const result = await firstValueFrom(this.deleteStudentFromCourse$
 .pipe(tap((data) => console.log('SERVICE: student deleted: ', data)),
 catchError((err: HttpErrorResponse) => this.handleError(err))))
 console.log('SERVICE: ADMIN DELETED A STUDENT FROM COURSE: ', result)

 return this.allCourses
  }

  handleError(err:HttpErrorResponse) {
    console.log('SERVICE: ERROR FROM SERVER -->: ', err)
    return of([])
  }

  formatDate(date: Date|string) {
 // Parse the date string using the French format
 if(date.toString().includes('-')) return date
 const [first, month, last] = (date as string).split('/');
 const frenchDate =
 new Date(parseInt(first.length === 4 ? first : last),
          parseInt(month) - 1,
          parseInt(first.length === 4 ? last : first)); // Months are 0-based in JavaScript
 // Format the date using the English format
 const englishDateString = this.refactorDate(frenchDate);
 return englishDateString;
  }

  refactorDate(date: Date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
}
