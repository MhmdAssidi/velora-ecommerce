import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey='access_token';

  constructor(private http: HttpClient) { }
//we need to store the token returned from backend api

setToken(token: string): void {  //saves the token returned by the backend into localStorage.used in login action
   console.log('Setting token:', token);  // This should log the token to the console

  localStorage.setItem(this.tokenKey, token);
}

 
  getToken(): string | null {  //Reads the token from localStorage 
    return localStorage.getItem(this.tokenKey);
  }
  clearToken(): void { //delete the token so used in logout action
    localStorage.removeItem(this.tokenKey);
  }

  login(credentials: { email: string, password: string }): Observable<any> { 

    //first send pass and email which are the credentails to the backend api using http
    return this.http.post<any>('http://192.168.7.156:5005/api/User/Login()', credentials).pipe(
      tap(response => { //tap lets you “do something” after getting a response. response here is what we will get from api 
        console.log('API Response:', response);  // Log the response
        if (response && response.token) { //if response return a token
          this.setToken(response.token); //store it in local storage
        }
      })
    );
  }
signup(data: {
  Firstname: string;
  Lastname: string;
  Email: string;
  Password: string;
  RoleName: string;
}): Observable<any> {
  return this.http.post<any>('http://192.168.7.156:5005/api/User/SignUp()', data).pipe(
    tap(response => {
      console.log('API Response:', response);  // Log the response
      if (response && response.token) {
        this.setToken(response.token);
      }
    })
  );
}


isLoggedIn(): boolean {
  return !!this.getToken();  //Returns true if there’s a token → user is logged in.
}
logout(): void {
    this.clearToken();
  }
}

