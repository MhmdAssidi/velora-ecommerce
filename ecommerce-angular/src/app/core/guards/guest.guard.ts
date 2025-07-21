import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  //prevents from loggedin user to navigate again to login page
  canActivate(): boolean | UrlTree {
    if (!this.authService.isLoggedIn()) {
      // user is not logged in:allow navigation
      return true;
    } else {
      // user is already logged in:redirect away
      return this.router.parseUrl('/home'); 
    }
  }
}
