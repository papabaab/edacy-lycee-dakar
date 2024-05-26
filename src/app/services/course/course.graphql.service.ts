import { Injectable } from '@angular/core';
import { Course } from 'src/app/models/course.interface';
import { Student } from 'src/app/models/student.interface';
import { CourseService } from './course.abstract.service';
import { Apollo, gql } from 'apollo-angular';
import { map, mergeMap, of, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CourseServiceGraphQl extends CourseService {

  constructor(private apollo: Apollo) {
    super()
   }



  override async getAllCourses(): Promise<Course[]> {
    this.allCourses$ = this.apollo.query({
      query: QUERIES.ALL_COURSES,
      errorPolicy: 'all'
    }).pipe(
      tap((data) => console.log('GRAPHQL SERVICE: ALL COURSES: ', data)),
      map((courses: any) => [...courses.data?.findAllCourse]),
      mergeMap((courses: Course[]) => of([...JSON.parse(JSON.stringify(courses))] as Course[])), // to unfreeze the cached object from apollo
      tap((data) => console.log('GRAPHQL SERVICE: ALL COURSES MAPPED -->: ', data)),
    )
    this.allCourses = await super.getAllCourses()
    console.log('ALL COURSES AFTER GRAPHQL: ', this.allCourses)
    return this.allCourses
  }



  override async getStudentsInCourse(courseId: string|number): Promise<Student[]> {
    this.allStudentsInCourse$ = this.apollo.query({
      query: QUERIES.ALL_STUDENTS_IN_COURSE, variables: {courseId: courseId},
      errorPolicy: 'all'
    }).pipe(
      tap((data) => console.log('GRAPHQL SERVICE: ALL STUDENTS IN COURSES: ', data)),
      map((courses: any) => [...courses.data?.studentsInCourse]),
      mergeMap((students: Student[]) => of([...JSON.parse(JSON.stringify(students))] as Student[])), // to unfreeze the cached object from apollo
      tap((data) => console.log('GRAPHQL SERVICE: ALL STUDENTS IN COURSE MAPPED -->: ', data)),
    )
    return super.getStudentsInCourse(courseId)
  }





  override async editCourse(course: Course): Promise<Course[]> {
    console.log('COURSE GRAPHAL SERVICE: ADMIN WANTS TO EDIT A COURSE: ', course)
    this.editCourse$ = this.apollo.mutate({
      mutation: QUERIES.EDIT_COURSE, variables: {courseId: course.courseId, course: course},
      errorPolicy: 'all'
    }).pipe(
      tap((data) => console.log('GRAPHQL SERVICE: EDIT COURSE: ', data)),
      map((course: any) => course.data?.updateCourse),
      mergeMap((course: Course) => of(JSON.parse(JSON.stringify(course)) as Course)), // to unfreeze the cached object from apollo
      tap((data) => console.log('GRAPHQL SERVICE: EDITED COURSE MAPPED -->: ', data)),
    )

   return super.editCourse(course)
  }





  override async addCourse(course: Course): Promise<Course> {
    console.log('COURSE GRAPHAL SERVICE: ADMIN WANTS TO ADD A COURSE: ', course)
    this.addCourse$ = this.apollo.mutate({
      mutation: QUERIES.ADD_COURSE, variables: {course: course},
      errorPolicy: 'all'
    }).pipe(
      tap((data) => console.log('GRAPHQL SERVICE: ADD COURSE: ', data)),
      map((course: any) => course.data?.createCourse),
      mergeMap((course: Course) => of(JSON.parse(JSON.stringify(course)) as Course)), // to unfreeze the cached object from apollo
      tap((data) => console.log('GRAPHQL SERVICE: ADDED COURSE MAPPED -->: ', data)),
    )
    const courseAdded = await super.addCourse(course) as Course
    return courseAdded
  }




  override async deleteSelectedCourse(course: Course): Promise<Course[]> {
    this.deleteSelectedCourse$ = this.apollo.mutate({
      mutation: QUERIES.DELETE_COURSE, variables: {courseId: course.courseId},
      errorPolicy: 'all'
    }).pipe(
      tap((data) => console.log('GRAPHQL SERVICE: DELETE COURSE: ', data)),
      map((course: any) => course.data?.deleteCourse),
      mergeMap((course: Course) => of(JSON.parse(JSON.stringify(course)) as Course)), // to unfreeze the cached object from apollo
      tap((data) => console.log('GRAPHQL SERVICE: DELETED COURSE MAPPED -->: ', data)),
    )

    return super.deleteSelectedCourse(course)
  }



  override async editStudent(student: Student): Promise<Course[]> {
    this.editStudent$ = this.apollo.mutate({
      mutation: QUERIES.EDIT_STUDENT, variables: {studentId: student.studentId, student: student},
      errorPolicy: 'all'
    }).pipe(
      tap((data) => console.log('GRAPHQL SERVICE: EDIT STUDENT IN COURSES: ', data)),
      map((student: any) => student.data?.updateStudent),
      mergeMap((student:Student) => of(JSON.parse(JSON.stringify(student)) as Student)), // to unfreeze the cached object from apollo
      tap((data) => console.log('GRAPHQL SERVICE: EDITED STUDENT IN COURSE MAPPED -->: ', data)),
    )

    return super.editStudent(student)
  }




  override async addStudentToCourse(student: Student): Promise<Student> {
    this.addStudentToCourse$ = this.apollo.mutate({
      mutation: QUERIES.ADD_STUDENT, variables: {student: student},
      errorPolicy: 'all'
    }).pipe(
      tap((data) => console.log('GRAPHQL SERVICE: ADD STUDENT IN COURSE: ', data)),
      map((student: any) => student.data?.createStudent),
      mergeMap((student: Student) => of(JSON.parse(JSON.stringify(student)) as Student)), // to unfreeze the cached object from apollo
      tap((data) => console.log('GRAPHQL SERVICE: ADDED STUDENT IN COURSE MAPPED -->: ', data)),
    )
    return super.addStudentToCourse(student)
  }






  override async deleteStudentFromCourse(student: Student): Promise<Course[]> {
    console.log('COURSE GRAPHAL SERVICE: ADMIN WANTS TO DELETE A COURSE: ', student)
    this.deleteStudentFromCourse$ = this.apollo.mutate({
      mutation: QUERIES.DELETE_STUDENT, variables: {studentId: student.studentId},
      errorPolicy: 'all'
    }).pipe(
      tap((data) => console.log('GRAPHQL SERVICE: DELETE STUDENT: ', data)),
      map((student: any) => student.data?.deleteStudent),
      mergeMap((student: Student) => of(JSON.parse(JSON.stringify(student)) as Student)), // to unfreeze the cached object from apollo
      tap((data) => console.log('GRAPHQL SERVICE: DELETED STUDENT FROM COURSE MAPPED -->: ', data)),
    )
    return super.deleteStudentFromCourse(student)
  }

}

const QUERIES = {
  ALL_COURSES : gql`
  query GetAllCourses {
    findAllCourse {
      courseTitle
      startDate
      endDate
      courseId
      professor
      description
      students {
        studentId
        firstname
        lastname
        courseId
        email
        username

      }
    }
  }
`,
ALL_STUDENTS_IN_COURSE: gql`
query StudentsInCourse ($courseId: String!){
  studentsInCourse(courseId: $courseId){
        studentId,
        firstname,
        lastname,
        email,
        username,

    }
}
`,

EDIT_COURSE: gql`
mutation UpdateCourse($courseId: String!, $course: CourseInput!){
  updateCourse(
    id: $courseId
    data: $course
  ){
    courseId,
    courseTitle,
    description,
    startDate,
    endDate,
    professor
  }
}
`,

EDIT_STUDENT: gql`
mutation EditStudent($studentId: String!, $student: StudentInput!){
  updateStudent(
    id: $studentId,
    data: $student
  ){
    firstname,
    lastname,
    username,
    email,
    courseId
  }
}
`,

ADD_COURSE: gql`
mutation AddCourse($course: CourseInput!){
  createCourse(
    data: $course
  ){
    courseId,
    courseTitle,
    description,
    startDate,
    endDate,
    professor
  }
}
`,

ADD_STUDENT: gql`
mutation AddStudent($student: StudentInput!){
  createStudent(
    data: $student
  ){
    firstname,
    lastname,
    username,
    email,
    courseId,
    studentId,
  }
}
`,
DELETE_COURSE: gql`
mutation DeleteCourse($courseId: String!){
  deleteCourse(
    id: $courseId
  ){
    courseId,
    courseTitle,
    description,
    startDate,
    endDate,
    professor
  }
}
`,
DELETE_STUDENT: gql`
mutation DeleteStudent($studentId: String!){
  deleteStudent(
    id: $studentId,
  ){
    firstname,
    lastname,
    username,
    email,
    courseId
  }
}
`,
}
