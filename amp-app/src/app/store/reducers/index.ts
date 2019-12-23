import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { reducer as AuthReducer } from './auth.reducer';
import { reducer as CoursesReducer } from './courses.reducer';
import { Course } from '../../models/course.model';


export interface AmpState {
  auth: boolean,
  courses: Course[],
}

export const reducers: ActionReducerMap<AmpState> = {
  auth: AuthReducer,
  courses: CoursesReducer,
};
