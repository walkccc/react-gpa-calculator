import React, { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { CourseType, GradeLetter, GPAScale, ExtendedGradeLetter } from '../../lib/types';
import { getGradeNumber } from '../../lib/utils';

import './index.scss';

interface Props {
  scale: GPAScale;
  addCourse: (newCourse: CourseType) => void;
}

const gradeLetters: GradeLetter[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'F'];
const extendedGradeLetters: ExtendedGradeLetter[] = [
  'A+',
  'A',
  'A-',
  'B+',
  'B',
  'B-',
  'C+',
  'C',
  'C-',
  'D+',
  'D',
  'F',
];

export const AddCourseForm = ({ scale, addCourse }: Props) => {
  const [courseName, setCourseName] = useState('');
  const [credit, setCredit] = useState('');
  const [grade, setGrade] = useState('');

  useEffect(() => {
    setGrade('A+');
  }, [scale]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // check if entered credit is valid
    const creditNumber = Number(credit);
    if (isNaN(creditNumber) || creditNumber < 0) {
      alert('You must enter a valid credit');
      return;
    }

    let gradeNumber: number;

    if (scale === '100') {
      gradeNumber = Number(grade);
      if (isNaN(gradeNumber) || gradeNumber < 0 || gradeNumber > 100) {
        alert('You must enter a valid grade');
        return;
      }
    } else {
      const gradeLetter = grade as ExtendedGradeLetter;
      gradeNumber = getGradeNumber(scale, gradeLetter);
    }

    addCourse({
      id: uuidv4(),
      courseName,
      credit: creditNumber,
      grade: gradeNumber,
      counted: true,
    });

    setCourseName('');
    setCredit('');
    setGrade('');
  };

  const gradeOptions = (scale === '4.3' ? gradeLetters : extendedGradeLetters).map((grade) => {
    return (
      <option key={grade} value={grade}>
        {grade}
      </option>
    );
  });

  let gradeInput: JSX.Element;

  if (scale === '100') {
    gradeInput = (
      <input
        type="text"
        aria-label="Grade"
        placeholder="95"
        required
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="grade"
      />
    );
  } else {
    gradeInput = (
      <select name="grade" className="grade" onChange={(e) => setGrade(e.target.value)}>
        {gradeOptions}
      </select>
    );
  }

  return (
    <div className="new-course-form">
      <div className="header">
        <span className="course-name">Course Name</span>
        <span className="credit">Credit</span>
        <span className="grade">Grade</span>
        <span className="dummy" />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          aria-label="Course Name"
          placeholder="e.g. Linear Algebra"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="course-name"
        />

        <input
          type="text"
          aria-label="Credit"
          placeholder="3"
          required
          value={credit}
          onChange={(e) => setCredit(e.target.value)}
          className="credit"
        />

        {gradeInput}

        <button className="dummy">
          <i className="fas fa-plus" />
        </button>
      </form>
    </div>
  );
};
