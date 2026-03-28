import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class adminGuard implements CanActivate{

  constructor(private authService:AuthenticationService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if(this.authService.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    } 
  }

}