
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map, of, tap } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Course } from 'src/app/models/course.interface';
import { Student } from 'src/app/models/student.interface';
const COURSES: Course[] = [
  {
    courseTitle: 'Terminal S1',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    courseId: 5,
    students: [
      {
        studentId: 1,
        firstname: 'Alice',
        lastname: "Wonderland",
        courseId:5,
      },
      {
        studentId: 2,
        firstname: 'Alice',
        lastname: "Wonderland",
        courseId:5,
      },
      {
        studentId: 3,
        firstname: 'Alice',
        lastname: "Wonderland",
        courseId:5,
      },
    ]
  },
  {
    courseTitle: 'Terminal S2',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    courseId: 1,
    students: [
      {
        studentId: 1,
        firstname: 'Alice',
        lastname: "Wonderland",
        courseId:1,
      },
      {
        studentId: 2,
        firstname: 'Alice',
        lastname: "Wonderland",
        courseId:1,
      },
      {
        studentId: 3,
        firstname: 'Alice',
        lastname: "Wonderland",
        courseId:1,
      },
    ]
  },
  {
    courseTitle: 'Terminal L1',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    courseId: 2,
    students: [
      {
        studentId: 1,
        firstname: 'Alice',
        lastname: "Wonderland",
        courseId:2,
      },
      {
        studentId: 2,
        firstname: 'Alice',
        lastname: "Wonderland",
        courseId:2,
      },
      {
        studentId: 3,
        firstname: 'Alice',
        lastname: "Wonderland",
        courseId:2,
      },
    ]
  },
  {
    courseTitle: 'Terminal L2',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    courseId: 3,
    students: [
      {
        studentId: 1,
        firstname: 'Alice',
        lastname: "Wonderland",
        courseId:3,
      },
      {
        studentId: 2,
        firstname: 'Alice',
        lastname: "Wonderland",
        courseId:3,
      },
      {
        studentId: 3,
        firstname: 'Alice',
        lastname: "Wonderland",
        courseId:3,
      },
    ]
  },
  {
    courseTitle: 'Terminal G1',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    courseId: 4,
    students: [
      {
        studentId: 1,
        firstname: 'Alice',
        lastname: "Wonderland",
        courseId:4,
      },
      {
        studentId: 2,
        firstname: 'Alice',
        lastname: "Wonderland",
        courseId:4,
      },
      {
        studentId: 3,
        firstname: 'Alice',
        lastname: "Wonderland",
        courseId:4,
      },
    ]
  }
];
const api = environment.api



@Injectable({
  providedIn: 'root'
})
export class CourseService {

allCourses: Course[] = COURSES



  constructor(private httpClient: HttpClient) { }




  async getAllCourses(): Promise<Course[]> {
    const res = await firstValueFrom(this.httpClient.get<Course[]>(`${api}/courses`)
    .pipe(tap((data) => console.log('SERVICE: ALL COURSES FROM API: ', data)),
    map((data: any) => data.map((e:Course)=>{
      e.startDate = this.formatDate(e.startDate)
      e.endDate = this.formatDate(e.endDate)
      return e
    }) as Course[]),
          catchError((err: HttpErrorResponse) => this.handleError(err))))
    this.allCourses = res
    return this.allCourses
  }





  async editCourse(course: Course): Promise<Course[]> {
    console.log('SERVICE: ADMIN WANTS TO EDIT A COURSE: ', course)

    const result = await firstValueFrom(this.httpClient.put(`${api}/courses/${course.courseId}`, course)
    .pipe(tap((data) => console.log('SERVICE: Course edited: ', data)),
    catchError((err: HttpErrorResponse) => this.handleError(err))))
    this.allCourses = this.allCourses.filter(e=>e.courseId !== course.courseId)
    this.allCourses.push(result as Course)
    return this.allCourses

  }





  async addCourse(course: Course): Promise<Course> {
    console.log('SERVICE: ADMIN WANTS TO ADD A COURSE: ', course)

    const result = await firstValueFrom(this.httpClient.post(`${api}/courses`, course)
    .pipe(tap((data) => console.log('SERVICE: Course added: ', data)),
    map((data:any) => data['course'] as Course),
    catchError((err: HttpErrorResponse) => this.handleError(err))))
    this.allCourses.push(result as Course)
    return result as Course
  }




  async deleteSelectedCourse(course: Course): Promise<Course[]> {
    console.log('SERVICE: ADMIN WANTS TO DELETE A COURSE: ', course)
    this.allCourses = this.allCourses.filter(e=>e.courseId !== course.courseId)
    // return new Promise((resolve,reject)=>{
    //   resolve(this.allCourses)
    // })
    const result = await firstValueFrom(this.httpClient.delete(`${api}/courses/${course.courseId}`)
    .pipe(tap((data) => console.log('SERVICE: Course deleted: ', data)),
    catchError((err: HttpErrorResponse) => this.handleError(err))))
    console.log('SERVICE: ADMIN WANTS TO DELETE A COURSE: ', result)
    return this.allCourses
  }



  async editStudent(student: Student): Promise<Course[]> {
    console.log('SERVICE: ADMIN WANTS TO EDIT A STUDENT: ', student)

      const ind = this.allCourses.indexOf(this.allCourses.find(e=>e.courseId == student.courseId) as Course)
      this.allCourses[ind].students = this.allCourses[ind]?.students?.filter(e=>e.studentId !== student.studentId)
      this.allCourses[ind]?.students?.push(student)



    const result = await firstValueFrom(
      this.httpClient.put(`${api}/courses/${student.courseId}/students/${student.studentId}`,
                          student)
                            .pipe(tap((data) => console.log('SERVICE: student edited: ', data)),
                                  catchError((err: HttpErrorResponse) => this.handleError(err)))
                          )

    console.log('SERVICE: ADMIN EDITED A STUDENT: ', result)

    return this.allCourses

  }




  async addStudentToCourse(student: Student): Promise<Course[]> {
    console.log('SERVICE: ADMIN WANTS TO ADD A STUDENT TO A COURSE: ', student)
      const ind = this.allCourses.indexOf(this.allCourses.find(e=>e.courseId == student.courseId) as Course)

    const result = await firstValueFrom(this.httpClient.post(`${api}/courses/${student.courseId}/students`, student)
    .pipe(tap((data) => console.log('SERVICE: student added: ', data)),
    map((data:any) => data['student'] as Student),
    catchError((err: HttpErrorResponse) => this.handleError(err))))
    console.log('SERVICE: ADMIN ADDED A NEW STUDENT TO COURSE: ', result)
    this.allCourses[ind].students?.unshift(result as Student)
    return this.allCourses
  }






  async deleteStudentFromCourse(student: Student): Promise<Course[]> {
      const ind = this.allCourses.indexOf(this.allCourses.find(e=>e.courseId == student.courseId) as Course)
       this.allCourses[ind].students = this.allCourses[ind].students?.filter(e=>e.studentId !== student.studentId)

    const result = await firstValueFrom(this.httpClient.delete(`${api}/courses/${student.courseId}/students/${student.studentId}`)
    .pipe(tap((data) => console.log('SERVICE: student deleted: ', data)),
    catchError((err: HttpErrorResponse) => this.handleError(err))))
    console.log('SERVICE: ADMIN DELETED A STUDENT FROM COURSE: ', result)

    return this.allCourses
  }




  handleError(err:HttpErrorResponse) {
    console.log('SERVICE: ERROR from server: ', err)
    return of([])
  }

  private formatDate(date: Date|string) {
 // Parse the date string using the French format
 const [day, month, year] = (date as string).split('/');
 const frenchDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); // Months are 0-based in JavaScript
 // Format the date using the English format
 const englishDateString = this.refactorDate(frenchDate);
 return englishDateString;
  }

  private refactorDate(date: Date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
}
