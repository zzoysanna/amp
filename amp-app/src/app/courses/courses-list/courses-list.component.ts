import { Component, OnInit } from '@angular/core';
import { OrderByPipe } from "../order-by-pipe/order-by.pipe";
import { MatDialog } from "@angular/material";
import { CourseDeleteDialogComponent } from "../course-delete-dialog/course-delete-dialog.component";
import { Router } from "@angular/router";
import { CoursesService } from "../../services/courses.service";
import { Course } from "../../models/course.model";
import { filter, tap } from "rxjs/operators";
import { AmpState } from "../../store/reducers";
import { Store } from "@ngrx/store";

@Component({
  selector: 'amp-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  providers: [OrderByPipe],
})
export class CoursesListComponent implements OnInit {
  public courses: Course[];
  public filteredCourses: Course[];

  constructor(
    private orderPipe: OrderByPipe,
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private store: Store<AmpState>,
  ) { }

  public ngOnInit() {
    this.store.select('courses').pipe(
      tap(courses => {
        if(!courses) {
          return this.coursesService.getCoursesFirst();
        }
      }),
      filter(courses => !!courses),
    ).subscribe(
      courses => {
        this.courses = courses;
        this.filteredCourses = this.courses;
      },
      error => console.error(error),
    )
  }

  public onLoadMore(): void {
    this.coursesService.getCoursesPartial();
  }

  public onDeleteCourse(id: string): void {
    let dialogRef = this.dialog.open(CourseDeleteDialogComponent, {
      data: {id},
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if(result) {
          this.coursesService.removeItem(id);
        }
      }
    );
  }

  public onEditCourse(id: string): void {
    this.router.navigateByUrl(`course/${id}`);
  }

  public filterCourses(query: string): void {
    this.filteredCourses = this.orderPipe.transform(this.filteredCourses, 'title', query);
  }

  public searchCourses(query: string): void {
    this.coursesService.search(query);
  }

  public clearFilter(): void {
    this.coursesService.onClearSearch();
  }

  public goToNew(): void {
    this.router.navigateByUrl('courses/new');
  }

}
