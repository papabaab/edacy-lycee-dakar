import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/models/course.interface';
import { Student } from 'src/app/models/student.interface';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  @Input() courses: Course[] = []
  @Input() student!: Student | null

  @Output() newStudent = new EventEmitter<Student>();
  @Output() editStudent = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();

firstName: any;
lastname: any;
classCourse: any;
headerLabel: string = 'ADD A NEW STUDENT';
butttonLabel: string = 'ADD STUDENT';







  ngOnInit(): void {
      console.log("ALL COURSES: ", this.courses)
      this.student?.firstName? this.headerLabel = 'EDIT STUDENT INFORMATION':''
      this.student?.firstName? this.butttonLabel = 'EDIT STUDENT':''
      if(this.student?.firstName){
        this.firstName = this.student.firstName.split(' ')[0]
        this.lastname = this.student.firstName.includes(' ')? this.student.firstName.split(' ')[1]:''
        this.classCourse = this.student.courseId
      }
  }

addEditStudent() {
  console.log('ADD EDIT STUDENT METHOD: ', this.firstName, this.lastname, this.classCourse, this.student)
  if (this.firstName && this.lastname && this.classCourse !== null) {
    if(this.student?.firstName){
      console.log('EDITING STUDENT: ', this.student.firstName)
      this.editStudent.emit({oldStudent: this.student, newStudent: {
        name: `${this.firstName} ${this.lastname}`,
        courseId: this.classCourse
      }})

    } else {
      this.newStudent.emit({
      firstName: `${this.firstName} ${this.lastname}`,
      courseId: this.classCourse
    })
    }

    // this.courses.push(newStudent);
    this.firstName = '';
    this.lastname = '';
    this.classCourse = '';
  }
}


cancel() {
  console.log("ADMIN WANTS TO CANCEL: ")
  this.onCancel.emit(true)

}

}
