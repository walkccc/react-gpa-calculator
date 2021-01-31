import React, { Fragment, useState } from 'react';

import { GPAScale } from '../../lib/types';
import { getDisplayedGrade } from '../../lib/utils';

import './index.scss';

interface Props {
  scale: GPAScale;
  id: string;
  courseName: string;
  grade: number;
  credit: number;
  counted: boolean;
  updateCourse: (id: string, courseName: string, grade: number, credit: number) => void;
  toggleCourse: (id: string) => void;
  removeCourse: (id: string) => void;
}

export const Course = ({
  scale,
  id,
  courseName: initialCourseName,
  credit: initialCredit,
  grade: initialGrade,
  counted,
  updateCourse,
  toggleCourse,
  removeCourse,
}: Props) => {
  const [courseName, setCourseName] = useState(initialCourseName);
  const [credit, setCredit] = useState(initialCredit);
  const [grade, setGrade] = useState(initialGrade);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateCourse('', courseName, grade, credit);
    setIsEditing(false);
  };

  const courseElement = isEditing ? (
    <form onSubmit={handleUpdate}>
      <input
        placeholder="Course Name"
        aria-label="Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        className="course-name"
      />

      <input
        placeholder="Credit"
        aria-label="Credit"
        required
        value={credit}
        onChange={(e) => setCredit(Number(e.target.value))}
        className="credit"
      />

      <input
        placeholder="Grade"
        aria-label="Grade"
        required
        value={grade}
        onChange={(e) => setGrade(Number(e.target.value))}
        className="grade"
      />
      <button>Save</button>
    </form>
  ) : (
    <Fragment>
      <span onClick={() => toggleCourse(id)} className={counted ? '' : 'striked'}>
        {courseName} ({credit}): {getDisplayedGrade(scale, grade)}
      </span>
      <div className="buttons">
        <button onClick={() => setIsEditing(!isEditing)}>
          <i className="fas fa-pen" />
        </button>
        <button onClick={() => removeCourse(id)}>
          <i className="fas fa-trash" />
        </button>
      </div>
    </Fragment>
  );

  return (
    <li className="course" id={id}>
      {courseElement}
    </li>
  );
};
