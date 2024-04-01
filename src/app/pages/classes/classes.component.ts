import { Component, OnInit } from '@angular/core';
import { Course, Student } from '../models.interface';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {


  courses: Course[] = [
    {
      name: 'Terminal S1',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      courseId: 0,
      students: [{name: 'Alice'}, {name: 'Bob'}, {name: 'Charlie'}, {name: 'David'}, {name: 'Eve'}]
    },
    {
      name: 'Terminal S2',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      courseId: 1,
      students: [{name: 'Alice'}, {name: 'Bob'}, {name: 'Charlie'}, {name: 'David'}, {name: 'Eve'}]
    },
    {
      name: 'Terminal L1',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      courseId: 2,
      students: [{name: 'Alice'}, {name: 'Bob'}, {name: 'Charlie'}, {name: 'David'}, {name: 'Eve'}]
    },
    {
      name: 'Terminal L2',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      courseId: 3,
      students: [{name: 'Alice'}, {name: 'Bob'}, {name: 'Charlie'}, {name: 'David'}, {name: 'Eve'}]
    },
    {
      name: 'Terminal G1',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      courseId: 4,
      students: [{name: 'Alice'}, {name: 'Bob'}, {name: 'Charlie'}, {name: 'David'}, {name: 'Eve'}]
    }
  ];

  selectedCourse: Course | null |undefined= null;
  isAddingEditingStudent = false;
  isAddingEditingClass = false;
selectedStudent!: Student |null;
  ngOnInit(){

  }


addCourse() {
  this.isAddingEditingStudent = true
  this.isAddingEditingClass = false
  console.log('USER WANTS TO ADD A COURSE: ')
}


addClass(){
  this.selectedCourse = null
  this.selectedStudent = null
  this.isAddingEditingClass = true;
  this.isAddingEditingStudent = false
}



  selectCourse(course: Course) {
    this.selectedCourse = course;
    this.isAddingEditingStudent = false;
    this.isAddingEditingClass = false;
  }





addStudentToClass($event: any) {
console.log('ADMIN WANTS TO ADD A STUDENT TO A CLASS: ', $event)
this.isAddingEditingStudent = false;
 this.courses[$event.courseId].students.push($event)
 this.selectedCourse = this.courses.find(e=>e.courseId == $event.courseId)
 console.log("NEW STUDENT ADDED TO COURSE: ", this.courses[$event.courseId])
}


editStudentInClass($event: any){
  console.log('ADMIN WANTS TO EDIT A STUDENT IN CLASS: ', $event)
  const student = $event.oldStudent;
  const newStudent = $event.newStudent;
  this.isAddingEditingStudent = false;
  if(student.courseId !== newStudent.courseId){
    this.courses[student.courseId].students.filter(e=>e.name!== student.name)
    this.courses[newStudent.courseId].students.push(newStudent)
    this.selectedCourse = this.courses.find(e=>e.courseId == newStudent.courseId)

  } else {
    let ind = student.courseId;

    let s = this.courses[ind].students.findIndex(e=>e.name == student.name)
    // console.log("S--->", s, ind, student.name, this.courses[ind], this.courses[ind].students[s])
    this.courses[ind].students[s] = newStudent
    this.selectedCourse = this.courses[ind]
  }
}

onCourseEditAdd($event: any) {
  console.log('ADMIN WANTS TO ADD A CLASS: ', $event)
  this.isAddingEditingClass = false;
  this.isAddingEditingStudent = false;
  const course : Course = $event;
  if(this.courses.filter(e=>e.courseId == course.courseId)){
    this.courses[course.courseId] = course;
  } else this.courses.push(course)
}



editClass(selectedCourse: any){
  console.log('ADMIN WANT TO EDIT A CLASS: ', selectedCourse)
  this.isAddingEditingClass = true;
  this.isAddingEditingStudent = false;

}



editStudent(student: Student, course: Course) {
  console.log('ADMIN WANTS TO EDIT STUDENT')
  this.selectedStudent = student;
  this.isAddingEditingStudent = true;
  this.isAddingEditingClass = false;
  this.selectedStudent.courseId = course.courseId

}
}
