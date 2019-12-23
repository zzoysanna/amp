import { createAction, props } from '@ngrx/store';
import { Course } from "../../models/course.model";

export enum CoursesActionTypes {
  SET_COURSES = '[Courses] Set Courses',
  ADD_COURSES = '[Courses] Add Courses',
  EDIT_COURSE = '[Courses] Edit Course',
};

export const SetCoursesAction = createAction(
  CoursesActionTypes.SET_COURSES,
  props<{data: Course[]}>(),
);

export const AddCoursesAction = createAction(
  CoursesActionTypes.ADD_COURSES,
  props<{data: Course[]}>(),
);

export const EditCourseAction = createAction(
  CoursesActionTypes.EDIT_COURSE,
  props<{data: Course}>(),
);




