
export interface CourseResult {
  sNo: number;
  courseCode: string;
  courseName: string;
  credits: string;
  grade: string;
  status: 'P' | 'F' | '-';
  history?: string[]; // To simulate the F F F P look in the screenshot
}

export interface SemesterResult {
  semesterNumber: number;
  courses: CourseResult[];
  sgpa: string;
  securedCredits: string;
  totalCredits: string;
}

export interface Student {
  hallticketNumber: string;
  studentName: string;
  program: string;
  cgpa: string;
  semesters: SemesterResult[];
}

export enum ExamType {
  GENERAL = 'General',
  HONORS_AND_MINORS = 'Honors and Minors'
}

export enum ViewType {
  ALL_SEMESTERS = 'All Semesters',
  SINGLE_SEMESTER = 'Single Semester'
}
