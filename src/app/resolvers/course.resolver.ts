import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Course } from '../models/course.interface';
import { CourseService } from '../services/course/course.abstract.service';

export const CourseResolver: ResolveFn<Course[]> =
  async (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  courseService: CourseService = inject(CourseService)) => {
    const res = await courseService.getAllCourses();
    console.log('RESOLVER: ALL COURSES: ', route.params, state, res)
  return res
};
