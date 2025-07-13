import { Routes } from '@angular/router';
import { SignupComponent } from './pages/login/signup/signup.component';
import { LoginComponent } from './pages/login/login/login.component';
import { ForgotPasswordComponent } from './pages/login/forgot-password/forgot-password.component';
import { ConfirmationWindowComponent } from './pages/login/confirmation-window/confirmation-window.component';
import { NewPasswordComponent } from './pages/login/new-password/new-password.component';

export const routes: Routes = [
   { path: 'signup', component: SignupComponent },
   { path: 'signin', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'confirmation', component: ConfirmationWindowComponent },
      { path: 'new-password', component: NewPasswordComponent },
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
];
