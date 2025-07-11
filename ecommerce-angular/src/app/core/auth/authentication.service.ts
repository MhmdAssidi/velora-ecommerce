import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey='access_token';

  constructor(private http: HttpClient) { }

setToken(token: string): void {  //for login
  localStorage.setItem(this.tokenKey, token);
}

 
  getToken(): string | null {  //for checking if loggedin or not
    return localStorage.getItem(this.tokenKey);
  }
  clearToken(): void { //for logout
    localStorage.removeItem(this.tokenKey);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
  return this.http.post<any>('http://192.168.1.187:5005/api/User/Login()', credentials).pipe(
    tap(response => {
      if (response && response.token) {
        this.setToken(response.token);
      }
    })
  );
}
signup(data: { name: string, email: string, password: string }): Observable<any> {
  return this.http.post<any>('http://192.168.1.187:5005/api/User/Signup()', data).pipe(
    tap(response => {
      if (response && response.token) {
        this.setToken(response.token);
      }
    })
  );
}

isLoggedIn(): boolean {
  return !!this.getToken();
}
logout(): void {
    this.clearToken();
  }
}

