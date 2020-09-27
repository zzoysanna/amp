import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from "./courses/courses-list/courses-list.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginFormComponent } from "./core/login-form/login-form.component";
import { AuthGuard } from "./services/auth.guard";
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: 'examples',
    loadChildren: './+examples#ExamplesModule'
  },
  {
    path: 'courses',
    component: CoursesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses/new',
    loadChildren: './+new-course#NewCourseModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'course/:id',
    loadChildren: './+new-course#NewCourseModule',
  },
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true
  })],
  exports: [RouterModule],
})
export class AppRouting {
}
