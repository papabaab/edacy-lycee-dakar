import { Student } from "./student.interface";


export interface Course{
  courseTitle: string;
  courseId: number,
  startDate: string;
  endDate: string;
  students: Student[];
  professor?: string;
  description?:string;
}
