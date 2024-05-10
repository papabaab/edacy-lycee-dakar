import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.interface';
import { Student } from 'src/app/models/student.interface';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {


  courses!: Course[]
  selectedCourse: Course | null |undefined= null;
  oldCourse: Course | null | undefined= null;
  isAddingEditingStudent = false;
  isAddingEditingCourse = false;
selectedStudent!: Student |null;
oldStudent!: Student |null;


  constructor(private courseServices: CourseService) {

  }
  ngOnInit(){
    this.courses = this.courseServices.getAllCourses()
    console.log('ALL COURSES: ', this.courses)
  }


addStudent() {
  this.isAddingEditingStudent = true
  this.isAddingEditingCourse = false
  console.log('USER WANTS TO ADD A COURSE: ')
}


addCourse(){
  this.selectedCourse = null
  this.selectedStudent = null
  this.isAddingEditingCourse = true;
  this.isAddingEditingStudent = false
}



  selectCourse(course: Course) {
    this.selectedCourse = course;
    this.isAddingEditingStudent = false;
    this.isAddingEditingCourse = false;
  }





addStudentToCourse($event: any) {
console.log('ADMIN WANTS TO ADD A STUDENT TO A CLASS: ', $event)
this.isAddingEditingStudent = false;
 this.courses[$event.courseId].students.push($event)
 this.selectedCourse = this.courses.find(e=>e.courseId == $event.courseId)
 console.log("NEW STUDENT ADDED TO COURSE: ", this.courses[$event.courseId])
}


editStudentInCourse($event: any){
  console.log('ADMIN WANTS TO EDIT A STUDENT IN CLASS: ', $event)
  const student = $event.oldStudent;
  const newStudent = $event.newStudent;
  this.isAddingEditingStudent = false;
  if(student.courseId !== newStudent.courseId){
    this.courses[student.courseId].students.filter(e=>e.firstName!== student.name)
    this.courses[newStudent.courseId].students.push(newStudent)
    this.selectedCourse = this.courses.find(e=>e.courseId == newStudent.courseId)

  } else {
    let ind = student.courseId;

    let s = this.courses[ind].students.findIndex(e=>e.firstName == student.name)
    // console.log("S--->", s, ind, student.name, this.courses[ind], this.courses[ind].students[s])
    this.courses[ind].students[s] = newStudent
    this.selectedCourse = this.courses[ind]
  }
}

onCourseEditAdd($event: any) {
  console.log('ADMIN WANTS TO ADD A CLASS: ', $event)
  this.isAddingEditingCourse = false;
  this.isAddingEditingStudent = false;
  const course : Course = $event;
  if(this.courses.filter(e=>e.courseId == course.courseId)){
    this.courses[course.courseId] = course;
  } else this.courses.push(course)
}



confirmEditCourse(){
  this.isAddingEditingCourse = false;
  this.isAddingEditingStudent = false;
  this.oldCourse=null
  console.log("EDITED COURSE: ", this.selectedCourse?.courseId);
  console.log("ALL COURSES, AFTER EDIT: ", this.courses);
}



editStudent(student: Student, course: Course) {
  console.log('ADMIN WANTS TO EDIT STUDENT', student)

  this.selectedStudent = student;
  this.oldStudent = student;
  this.isAddingEditingStudent = true;
  this.isAddingEditingCourse = false;
  this.selectedStudent.courseId = course.courseId

}

confirmEditStudent(student: Student, course: Course) {
  console.log('ADMIN WANTS TO CONFIRM EDIT STUDENT', student, course)
  this.selectedStudent = null;
  this.oldStudent = null;
  this.isAddingEditingStudent = false;
  this.isAddingEditingCourse = false;

}





cancelEditStudent(student: Student|null){
  student = this.oldStudent
  this.isAddingEditingStudent = false;
  this.isAddingEditingCourse = false;
  this.selectedStudent = null
  // this.oldStudent = null;
}
}
