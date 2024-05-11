import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { CourseService } from '../services/course/course.service';
import { inject } from '@angular/core';
import { Course } from '../models/course.interface';

export const CourseResolver: ResolveFn<Course[]> =
(route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  courseService: CourseService = inject(CourseService)) => {
    console.log('RESOLVER: ALL COURSES: ', route.params, state)
  return courseService.getAllCourses()
};
