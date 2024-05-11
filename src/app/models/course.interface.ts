import { Student } from "./student.interface";


export interface Course{
  courseTitle: string;
  courseId?: number,
  startDate: string | Date;
  endDate: string | Date;
  students?: Student[];
  professor?: string;
  description?:string;
}
