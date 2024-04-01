import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../models.interface';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
cancel() {
    console.log("ADMIN WANTS TO CANCEL: ")
}

@Input() course!: Course
@Output() courseEditEvent = new EventEmitter<Course>()
buttonLabel: string = 'ADD CLASS';
headerLabel: string = 'ADD A NEW CLASS';

name!: string;
  startDate!: string;
  endDate!: string;
  courseId!: number;



  ngOnInit(): void {
    console.log('value of course: ', this.course)
    this.buttonLabel =this.course.name!==''? 'MODIFY CLASS':'ADD CLASS'
    this.headerLabel =this.course.name!==''? 'EDIT CLASS DETAILS':'ADD A NEW CLASS'
    this.name = this.course.name
    this.startDate = this.course.startDate
    this.endDate = this.course.endDate
    this.courseId = this.course.courseId
  }




  addModifyClassCourse(){
    console.log('ADD OR MODIFY CLASS COURSE -->', this.course)
    this.course.name = this.name
    this.course.startDate = this.startDate
    this.course.endDate = this.endDate
    this.courseEditEvent.emit(this.course)
  }

}
