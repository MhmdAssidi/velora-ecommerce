import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey='access_token';

  private loggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem(this.tokenKey));
  isLoggedIn$ = this.loggedIn$.asObservable();

  constructor(private http: HttpClient) { }

  signin(data: { email: string; phone_number: string; password: string }): Observable<any> {
  return this.http.post<any>('http://localhost:5001/users/signin', data).pipe(
    tap(response => {
      console.log('Signin response:', response);

      if (response.token) { //save the returned token to localStorage
        localStorage.setItem('access_token', response.token);
        this.loggedIn$.next(true);
      }

      if (response.user) {  //save the user data to localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    })
  );
}
isLoggedIn(): boolean {
  return !!localStorage.getItem(this.tokenKey);
}
logout(): void {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
  this.loggedIn$.next(false);
}
signup(data: {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
}): Observable<any> {
  return this.http.post<any>('http://localhost:5001/users/signup', data).pipe(
    tap(response => {
      console.log('Signup response:', response);
      if (response.token) { //save the returned token to localStorage
        localStorage.setItem('access_token', response.token);
        this.loggedIn$.next(true);
      }

      if (response.user) {  //save the user data to localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    })
  );
}


}

