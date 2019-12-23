import { Course } from "../../models/course.model";
import { CoursesActionTypes } from "../actions/courses.actions";

export const initialState = null;

export interface CourseAction {
  type: string,
  data: any,
}

export function reducer(state = initialState, action: CourseAction): Course[] {
  switch (action.type) {
    case CoursesActionTypes.SET_COURSES:
      return state = action.data;
    case CoursesActionTypes.ADD_COURSES:
      return [...state, ...action.data];
    case CoursesActionTypes.EDIT_COURSE:
      const newState = state.slice();
      newState.forEach((course,i) => {
          if(course.id === action.data.id) {
            newState[i] = action.data;
          }
        }
      );
      return newState;
    default:
      return state;
  }
}
