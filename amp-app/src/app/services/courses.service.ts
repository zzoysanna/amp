import { Injectable } from '@angular/core';
import { Course } from "../models/course.model";
import { Observable, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map, switchMap, take } from "rxjs/operators";
import { AmpState } from "../store/reducers";
import { Store } from "@ngrx/store";
import { AddCoursesAction, EditCourseAction, SetCoursesAction } from "../store/actions/courses.actions";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private coursesToLoad = 5;

  constructor(
    private http: HttpClient,
    private store: Store<AmpState>,
  ) { }

  public getCoursesPartial(count: number = this.coursesToLoad): void {
    this.store.select('courses').pipe(
      take(1),
      map(courses => courses.length),
      switchMap(start => this.http.get<Course[]>(`${environment.rest}/courses?start=${start}&count=${count}`)),
    ).subscribe(
      courses => {
        this.store.dispatch(AddCoursesAction({data: courses}));
      }
    );
  }

  public getCoursesFirst(): void {
    this.http.get<Course[]>(`${environment.rest}/courses?start=0&count=${this.coursesToLoad}`).subscribe(
      courses => this.store.dispatch(SetCoursesAction({data: courses})),
    );
  }

  public search(query: string): void {
    this.http.get<Course[]>(`${environment.rest}/courses?textFragment=${query}`).subscribe(
      courses => {
        this.store.dispatch(SetCoursesAction({data: courses}));
      }
    );
  }

  public createCourse(course: Course): void {
    this.http.post<Course>(`${environment.rest}/courses`, course).subscribe(
      () => this.store.dispatch(AddCoursesAction({data: [course]})),
      error => console.error(error),
    );
  }

  public getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${environment.rest}/courses/${id}`);
  }

  public updateCourse(newCourse: Course): void {
    this.store.dispatch(EditCourseAction({data: newCourse}));
  }

  public removeItem(id: string): Subscription {
    return this.http.delete(`${environment.rest}/courses/${id}`).subscribe(
      () => this.getCoursesFirst(),
      error => console.error(error),
    );
  }

  public onClearSearch(): void {
    this.getCoursesFirst();
  }
}
