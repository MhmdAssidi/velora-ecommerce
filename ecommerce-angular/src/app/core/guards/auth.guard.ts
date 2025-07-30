import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}


  //used if user wants to navigate to shop page or checkout page without logging in so route him to signin
  canActivate(): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
    console.log({isLoggedIn:this.authService.isLoggedIn()})
      // user is logged in:allow navigation
      return true;
    } else {
      // user not logged in:redirect to signin page
      return this.router.parseUrl('/signup');
    }
  }
}
