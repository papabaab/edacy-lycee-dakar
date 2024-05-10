import { Injectable } from '@angular/core';
import { Course } from 'src/app/models/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

 courses: Course[] = [
    {
      courseTitle: 'Terminal S1',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      courseId: 0,
      students: [
        {
          studentId: 1,
          firstName: 'Alice',
          lastName: "Wonderland",
        },
        {
          studentId: 2,
          firstName: 'Alice',
          lastName: "Wonderland",
        },
        {
          studentId: 3,
          firstName: 'Alice',
          lastName: "Wonderland",
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
        },
        {
          studentId: 2,
          firstName: 'Alice',
          lastName: "Wonderland",
        },
        {
          studentId: 3,
          firstName: 'Alice',
          lastName: "Wonderland",
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
        },
        {
          studentId: 2,
          firstName: 'Alice',
          lastName: "Wonderland",
        },
        {
          studentId: 3,
          firstName: 'Alice',
          lastName: "Wonderland",
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
        },
        {
          studentId: 2,
          firstName: 'Alice',
          lastName: "Wonderland",
        },
        {
          studentId: 3,
          firstName: 'Alice',
          lastName: "Wonderland",
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
        },
        {
          studentId: 2,
          firstName: 'Alice',
          lastName: "Wonderland",
        },
        {
          studentId: 3,
          firstName: 'Alice',
          lastName: "Wonderland",
        },
      ]
    }
  ];




  constructor() { }




  getAllCourses(){
    return this.courses
  }
}
