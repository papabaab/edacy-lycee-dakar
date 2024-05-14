import { Student } from "./student.interface";


export interface Course{
  courseTitle: string;
  courseId?: number | string,
  startDate: string | Date;
  endDate: string | Date;
  students?: Student[];
  professor?: string;
  description?:string;
}
