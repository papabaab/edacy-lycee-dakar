
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course.interface';
import { Student } from 'src/app/models/student.interface';
import { CourseService } from 'src/app/services/course/course.abstract.service';

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
  selectedStudent!: Student | null
  oldStudent!: Student |null;
  SUBS: any;


  constructor(
    @Inject(CourseService) private courseServices: CourseService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }
  async ngOnInit(){
    this.SUBS = this.activatedRoute.data.subscribe((data) => {
      this.courses = data['courses'] as Course[]
      this.selectedCourse = this.courses[0]
      console.log('ALL COURSES: ', this.courses)
      console.log("SELECTED COURSE: ", this.selectedCourse)
    })
    // this.courses = await this.courseServices.getAllCourses()
    // this.selectedCourse = this.courses[0]
    // console.log('ALL COURSES: ', this.courses)
    // console.log("SELECTED COURSE: ", this.selectedCourse)
  }


addStudent() {
  this.isAddingEditingStudent = true
  this.isAddingEditingCourse = false
  this.selectedStudent = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    courseId: this.selectedCourse?.courseId
  }
  this.selectedCourse?.students?.unshift(this.selectedStudent)
  console.log('COMPONENT --> USER WANTS TO ADD A STUDENT: ', this.selectedCourse)
}


addCourse(){
  this.oldCourse = this.selectedCourse
  this.selectedCourse = {
    courseTitle:'',
    startDate: '',
    endDate: '',
    students: []
  }
  this.selectedStudent = null
  this.isAddingEditingCourse = true;
  this.isAddingEditingStudent = false
  console.log("OLD COURSE: ", this.oldCourse)
}



  selectCourse(course: Course) {
    this.selectedCourse = course;
    this.isAddingEditingStudent = false;
    this.isAddingEditingCourse = false;
  }




  async confirmAddEditCourse(){
  this.isAddingEditingCourse = false;
  this.isAddingEditingStudent = false;
  this.oldCourse=null
  console.log("EDITED COURSE: ", this.selectedCourse?.courseId);
  console.log("ALL COURSES, AFTER EDIT: ", this.courses);
  delete this.selectedCourse?.['students']

  if(this.selectedCourse?.courseId){
      const result = await this.courseServices.editCourse(this.selectedCourse as Course)
      console.log('COMPONENT --> ADMIN WANTS TO EDIT A COURSE: ', result)
      this.selectedCourse.students = await this.courseServices.getStudentsInCourse(this.selectedCourse?.courseId as string)
  } else  {
    const result = await this.courseServices.addCourse(this.selectedCourse as Course)
    this.selectedCourse = result
    console.log('COMPONENT --> ALL COURSES: ', result, this.courses)
  }

}



editStudent(student: Student) {
  console.log('ADMIN WANTS TO EDIT STUDENT', student)
  this.selectedStudent = student;
  this.oldStudent = student;
  this.isAddingEditingStudent = true;
  this.isAddingEditingCourse = false;

}




  async confirmAddEditStudent(student: Student) {
  console.log('COMPONENT --> ADMIN WANTS TO CONFIRM EDIT STUDENT', student)
  this.selectedStudent = null;
  this.oldStudent = null;
  this.isAddingEditingStudent = false;
  this.isAddingEditingCourse = false;
  if(student.studentId) {
  const result = await this.courseServices.editStudent(student)
  console.log('COMPONENT --> ADMIN WANTS TO CONFIRM EDIT STUDENT', this.courses)
  this.courses = result

} else {
  const result = await this.courseServices.addStudentToCourse(student)
  // this.selectedCourse?.students?.unshift(student)
  // this.selectedCourse = this.courses.find(e=>e.courseId == result.courseId)
  // this.selectedCourse!.students = await this.courseServices.getStudentsInCourse(result?.courseId as string)
  console.log("COMPONENT --> ADMIN ADDED A NEW STUDENT TO COURSE: ", result)
}

}





cancelEditStudent(student: Student|null){
  student = this.oldStudent
  this.isAddingEditingStudent = false;
  this.isAddingEditingCourse = false;
  this.selectedStudent = null
  // this.oldStudent = null;
}



  async deleteStudent(student: Student) {
  console.log('COMPONENT --> ADMIN WANTS TO DELETE A STUDENT: ', student)
  if(!confirm('Are you sure you want to delete this student?')) return
  const result = await this.courseServices.deleteStudentFromCourse(student)
  this.courses = result;
  console.log('COMPONENT --> ADMIN WANTS TO DELETE A STUDENT: ', this.selectedCourse)

}








  async deleteCourse(course: Course|null|undefined) {
    if(!confirm('Are you sure you want to delete this course?')) return
  const result = await this.courseServices.deleteSelectedCourse(course as Course)
  this.courses = result;
  this.selectedCourse = this.courses[0]
  console.log('COMPONENT --> ADMIN WANTS TO DELETE A COURSE: ', result)

}


logout() {
  console.log("LOGINN OUT --> ")
  localStorage.clear()
  this.router.navigate(['login'],{replaceUrl:true});
}





ngOnDestroy() {
  console.log("COURSES COMPONENT DESTROYED")
  this.SUBS?.unsubscribe()
}
}
