export interface CourseType {
  id: string;
  courseName: string;
  credit: number;
  grade: number;
  counted: boolean;
}

export type GPAScale = '100' | '4.0' | '4.3';
export type GradeLetter = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'F';
export type ExtendedGradeLetter = GradeLetter | 'D+' | 'D';
