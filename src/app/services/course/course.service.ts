
import { Injectable } from '@angular/core';
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
        firstName: 'Alice',
        lastName: "Wonderland",
        courseId:5,
      },
      {
        studentId: 2,
        firstName: 'Alice',
        lastName: "Wonderland",
        courseId:5,
      },
      {
        studentId: 3,
        firstName: 'Alice',
        lastName: "Wonderland",
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
        firstName: 'Alice',
        lastName: "Wonderland",
        courseId:1,
      },
      {
        studentId: 2,
        firstName: 'Alice',
        lastName: "Wonderland",
        courseId:1,
      },
      {
        studentId: 3,
        firstName: 'Alice',
        lastName: "Wonderland",
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
        firstName: 'Alice',
        lastName: "Wonderland",
        courseId:2,
      },
      {
        studentId: 2,
        firstName: 'Alice',
        lastName: "Wonderland",
        courseId:2,
      },
      {
        studentId: 3,
        firstName: 'Alice',
        lastName: "Wonderland",
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
        firstName: 'Alice',
        lastName: "Wonderland",
        courseId:3,
      },
      {
        studentId: 2,
        firstName: 'Alice',
        lastName: "Wonderland",
        courseId:3,
      },
      {
        studentId: 3,
        firstName: 'Alice',
        lastName: "Wonderland",
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
        firstName: 'Alice',
        lastName: "Wonderland",
        courseId:4,
      },
      {
        studentId: 2,
        firstName: 'Alice',
        lastName: "Wonderland",
        courseId:4,
      },
      {
        studentId: 3,
        firstName: 'Alice',
        lastName: "Wonderland",
        courseId:4,
      },
    ]
  }
];



@Injectable({
  providedIn: 'root'
})
export class CourseService {

allCourses: Course[] = COURSES



  constructor() { }




  getAllCourses(){
    return this.allCourses
  }





  editCourse(course: Course): Promise<Course[]> {
    console.log('SERVICE: ADMIN WANTS TO EDIT A COURSE: ', course)
    this.allCourses = this.allCourses.filter(e=>e.courseId !== course.courseId)
    this.allCourses.push(course)
    return new Promise((resolve,reject)=>{
      console.log("SERVICE: ALL COURSES: ", this.allCourses)
      resolve(this.allCourses)
    })
  }





  addCourse(course: Course): Promise<Course[]> {
    console.log('SERVICE: ADMIN WANTS TO ADD A COURSE: ', course)
    this.allCourses.push({ ...course,courseId: this.allCourses.sort((e1, e2) => e1.courseId - e2.courseId)[this.allCourses.length - 1].courseId + 1 })
    return new Promise((resolve,reject)=>{
      console.log("SERVICE: ALL COURSES: ", this.allCourses)
      resolve(this.allCourses)
    })
  }




  deleteSelectedCourse(course: Course): Promise<Course[]> {
    console.log('SERVICE: ADMIN WANTS TO DELETE A COURSE: ', course)
    this.allCourses = this.allCourses.filter(e=>e.courseId !== course.courseId)
    return new Promise((resolve,reject)=>{
      resolve(this.allCourses)
    })


  }



  editStudent(student: Student): Promise<Course[]> {
    console.log('SERVICE: ADMIN WANTS TO EDIT A STUDENT: ', student)
    return new Promise((resolve,reject)=>{
      const ind = this.allCourses.indexOf(this.allCourses.find(e=>e.courseId == student.courseId) as Course)
      this.allCourses[ind].students.filter(e=>e.studentId !== student.studentId)
      this.allCourses[ind].students.push(student)
      resolve(this.allCourses)
    })
  }




  addStudentToCourse(student: Student): Promise<Course[]> {
    console.log('SERVICE: ADMIN WANTS TO ADD A STUDENT TO A COURSE: ', student)
    return new Promise((resolve,reject) => {
      const ind = this.allCourses.indexOf(this.allCourses.find(e=>e.courseId == student.courseId) as Course)
      this.allCourses[ind].students.splice(this.allCourses[ind].students.indexOf(student), 1)
      const lastStudent : Student = this.allCourses[ind].students.sort((e1, e2) => Number(e2.studentId) - Number(e1.studentId))[0]
      console.log('SERVICE: LAST STUDENT ID: ', lastStudent, 'index of course', ind)
      this.allCourses[ind].students.unshift({...student, studentId: Number(lastStudent.studentId) + 1})
      if(lastStudent.studentId) resolve(this.allCourses)
        else reject('SERVICE: ERROR ADDING A NEW STUDENT' + lastStudent)
    })
  }


  deleteStudentFromCourse(student: Student): Promise<Course[]> {
    return new Promise((resolve,reject)=>{
      const ind = this.allCourses.indexOf(this.allCourses.find(e=>e.courseId == student.courseId) as Course)
       this.allCourses[ind].students = this.allCourses[ind].students.filter(e=>e.studentId !== student.studentId)
        console.log('SERVICE --> admin wants to remove student from course: ', this.allCourses[ind].students)
      resolve(this.allCourses)
    })
  }

}
