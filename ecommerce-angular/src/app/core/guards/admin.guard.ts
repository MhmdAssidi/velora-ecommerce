import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';
export class adminGuard implements CanActivate{

  constructor(private authService:AuthenticationService,private router:Router){}
  canActivate():boolean {
      const user=this.authService.getLoggedInUser();
      if(user==='mhmd.admin@gmail.com'){
        return true;
      }
      else{
        this.router.navigate(['/']);
        return false;
      }
  }

}