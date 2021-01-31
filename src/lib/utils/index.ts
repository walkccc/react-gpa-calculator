import { CourseType, ExtendedGradeLetter, GPAScale } from '../types';

export const getCredits = (courses: CourseType[]): number => {
  let credits = 0;

  for (const course of courses) {
    if (course.counted) {
      credits += course.credit;
    }
  }

  return credits;
};

export const getGPA = (scale: GPAScale, courses: CourseType[]) => {
  if (courses.length === 0) {
    return 0;
  }

  const credits = getCredits(courses);

  if (credits === 0) {
    return 0;
  }

  let gradeSum = 0.0;

  for (const course of courses) {
    if (course.counted) {
      gradeSum += getGrade(scale, course.grade) * course.credit;
    }
  }

  return gradeSum / credits;
};

export const getDisplayedGrade = (scale: GPAScale, grade: number): ExtendedGradeLetter | number => {
  if (scale === '100') {
    return grade;
  }

  if (scale === '4.3') {
    if (grade >= 90) return 'A+';
    if (grade >= 85) return 'A';
    if (grade >= 80) return 'A-';
    if (grade >= 77) return 'B+';
    if (grade >= 73) return 'B';
    if (grade >= 70) return 'B-';
    if (grade >= 67) return 'C+';
    if (grade >= 63) return 'C';
    if (grade >= 60) return 'C-';
    return 'F';
  }

  // scale === '4.0'
  if (grade >= 93) return 'A';
  if (grade >= 90) return 'A-';
  if (grade >= 87) return 'B+';
  if (grade >= 83) return 'B';
  if (grade >= 80) return 'B-';
  if (grade >= 77) return 'C+';
  if (grade >= 73) return 'C';
  if (grade >= 70) return 'C-';
  if (grade >= 67) return 'D+';
  if (grade >= 65) return 'D';
  return 'F';
};

// number [0, 100]
export const getGrade = (scale: GPAScale, grade: number): number => {
  if (scale === '100') {
    return grade;
  }

  if (scale === '4.3') {
    if (grade >= 90) return 4.3;
    if (grade >= 85) return 4.0;
    if (grade >= 80) return 3.7;
    if (grade >= 77) return 3.3;
    if (grade >= 73) return 3.0;
    if (grade >= 70) return 2.7;
    if (grade >= 67) return 2.3;
    if (grade >= 63) return 2.0;
    if (grade >= 60) return 1.7;
    return 0.0;
  }

  // scale === '4.0'
  if (grade >= 93) return 4.0;
  if (grade >= 90) return 3.7;
  if (grade >= 87) return 3.3;
  if (grade >= 83) return 3.0;
  if (grade >= 80) return 2.7;
  if (grade >= 77) return 2.3;
  if (grade >= 73) return 2.0;
  if (grade >= 70) return 1.7;
  if (grade >= 67) return 1.3;
  if (grade >= 65) return 1.0;
  return 0.0;
};

export const getGradeNumber = (scale: GPAScale, grade: ExtendedGradeLetter): number => {
  if (scale === '4.3') {
    if (grade === 'A+') return 95;
    if (grade === 'A') return 87;
    if (grade === 'A-') return 82;
    if (grade === 'B+') return 78;
    if (grade === 'B') return 75;
    if (grade === 'B-') return 70;
    if (grade === 'C+') return 68;
    if (grade === 'C') return 65;
    if (grade === 'C-') return 60;
    return 0;
  }

  // scale === '4.0'
  if (grade === 'A') return 93;
  if (grade === 'A-') return 90;
  if (grade === 'B+') return 87;
  if (grade === 'B') return 83;
  if (grade === 'B-') return 80;
  if (grade === 'C+') return 77;
  if (grade === 'C') return 73;
  if (grade === 'C-') return 70;
  if (grade === 'D+') return 67;
  if (grade === 'D') return 65;
  return 0;
};
