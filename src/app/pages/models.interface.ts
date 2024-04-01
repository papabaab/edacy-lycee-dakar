export interface Course{
  name: string;
  courseId: number,
  startDate: string;
  endDate: string;
  students: Student[]
}
export interface Student{
  name: string;
  studendId?: number,
  email?: string;
  password?: string;
  username?: string
  courseId?: number
}
