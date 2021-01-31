import React from 'react';

import { CourseType, GPAScale } from '../../lib/types';
import { Course } from '../Course';

import './index.scss';

interface Props {
  scale: GPAScale;
  courses: CourseType[];
  updateCourse: (id: string, courseName: string, grade: number, credit: number) => void;
  toggleCourse: (id: string) => void;
  removeCourse: (id: string) => void;
}

export const CourseList = ({ scale, courses, updateCourse, toggleCourse, removeCourse }: Props) => {
  return courses ? (
    <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
      {courses.map((course) => {
        return (
          <Course
            scale={scale}
            key={course.id}
            id={course.id}
            courseName={course.courseName}
            grade={course.grade}
            credit={course.credit}
            counted={course.counted}
            updateCourse={updateCourse}
            toggleCourse={toggleCourse}
            removeCourse={removeCourse}
          />
        );
      })}
    </ul>
  ) : null;
};
