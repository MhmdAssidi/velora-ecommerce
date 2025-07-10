import { Routes } from '@angular/router';
import { SignupComponent } from './pages/login/signup/signup.component';

export const routes: Routes = [
    { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: 'signup', pathMatch: 'full' }
];
