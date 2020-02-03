import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { User } from "../models/user.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthorized = new BehaviorSubject<boolean>(null);
  private userStream = new BehaviorSubject<User>(null);
  public isAuthFailed = new BehaviorSubject<boolean>(null);

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  public checkLogin(): void {
    const token = localStorage.getItem(environment.tokenKey);
    if(token) {
      this.getUserByToken(token).subscribe(
        user => {
          this.isAuthorized.next(true);
          this.userStream.next(user);
        }
      );
    }
  }

  public login(login: string, password: string): void {
    this.getUser(login).subscribe(
      user => {
        if(user && user.password === password) {
          this.userStream.next(user);
          localStorage.setItem(environment.tokenKey, user.fakeToken);
          this.isAuthorized.next(true);
          this.router.navigateByUrl('courses');
        } else {
          this.isAuthFailed.next(true);
        }
      },
      error => console.error(error),
    );
  }

  private getUser(login: string): Observable<User> {
    return this.http.get<User>(`${environment.rest}/users?login=${login}`).pipe(
      map(users => users[0]),
    );
  }

  private getUserByToken(token: string): Observable<User> {
    return this.http.get<User>(`${environment.rest}/users?fakeToken=${token}`).pipe(
      map(users => users[0]),
    );
  }

  public logout(): void {
    if(this.isAuthorized.getValue()) {
      localStorage.removeItem(environment.tokenKey);
      this.isAuthorized.next(false);
      this.userStream.next(null);
      this.router.navigateByUrl('login');
    }
  }

  public isAuthenticated(): Observable<boolean> {
    return this.isAuthorized.asObservable();
  }

  public getCurrentUser(): Observable<User> {
    return this.userStream.asObservable();
  }
}
