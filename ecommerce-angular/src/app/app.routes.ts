import { Routes } from '@angular/router';
import { SignupComponent } from './pages/login/signup/signup.component';
import { LoginComponent } from './pages/login/login/login.component';
import { ForgotPasswordComponent } from './pages/login/forgot-password/forgot-password.component';

export const routes: Routes = [
   { path: 'signup', component: SignupComponent },
   { path: 'signin', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
];
