import React, { useState } from 'react';

import { AddCourseForm } from './components';
import { CourseList } from './components/CourseList';
import { CourseType, GPAScale } from './lib/types';
import { getCredits, getGPA } from './lib/utils';

import './App.scss';

const scaleOptions: GPAScale[] = ['100', '4.0', '4.3'];

const mockCourses: CourseType[] = [
  { id: '1', courseName: 'LA', credit: 3, grade: 100, counted: true },
  { id: '2', courseName: 'DSA', credit: 3, grade: 97, counted: false },
  { id: '3', courseName: 'OS', credit: 3, grade: 83, counted: true },
];

export const App = () => {
  const [courses, setCourses] = useState<CourseType[]>(mockCourses);
  const [scale, setScale] = useState<GPAScale>('4.3');

  const addCourse = (newCourse: CourseType) => {
    setCourses([...courses, newCourse]);
  };

  const updateCourse = (id: string, courseName: string, grade: number, credit: number) => {
    const updatedCourses = courses.map((course) => {
      return course.id === id ? { ...course, courseName, credit, grade } : course;
    });
    setCourses(updatedCourses);
  };

  const toggleCourse = (id: string) => {
    const updatedCourses = courses.map((course) => {
      return course.id === id ? { ...course, counted: !course.counted } : course;
    });
    setCourses(updatedCourses);
  };

  const removeCourse = (id: string) => {
    const updatedCourses = courses.filter((course) => course.id !== id);
    setCourses(updatedCourses);
  };

  const renderScales = () => {
    return scaleOptions.map((scaleOption) => {
      return (
        <button
          key={scaleOption}
          className={scaleOption === scale ? 'btn btn-selected' : 'btn'}
          onClick={() => setScale(scaleOption)}
        >
          {scaleOption}
        </button>
      );
    });
  };

  return (
    <div id="app">
      <h1>
        GPA Calculator
        <span>Enter courses to calculate your GPA 🧐</span>
      </h1>
      <AddCourseForm scale={scale} addCourse={addCourse} />
      <div className="btns-container">{renderScales()}</div>
      <CourseList
        scale={scale}
        courses={courses}
        updateCourse={updateCourse}
        toggleCourse={toggleCourse}
        removeCourse={removeCourse}
      />
      <h2>
        Your GPA: {String(getGPA(scale, courses)).slice(0, 5)}
        <br />
        Total credits: {getCredits(courses)}
      </h2>
    </div>
  );
};
