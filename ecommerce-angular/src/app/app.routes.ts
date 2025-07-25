import { Routes } from '@angular/router';
import { SignupComponent } from './pages/login/signup/signup.component';
import { LoginComponent } from './pages/login/login/login.component';
import { ForgotPasswordComponent } from './pages/login/forgot-password/forgot-password.component';
import { ConfirmationWindowComponent } from './pages/login/confirmation-window/confirmation-window.component';
import { NewPasswordComponent } from './pages/login/new-password/new-password.component';
import { GuestGuard } from './core/guards/guest.guard';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  },
   { path: 'signup', component: SignupComponent,canActivate:[GuestGuard]},
   { path: 'signin', component: LoginComponent,canActivate: [GuestGuard]},
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'confirmation', component: ConfirmationWindowComponent },
      { path: 'new-password', component: NewPasswordComponent },
      {
    path: 'shop',
    component: ShopComponent,
    // canActivate: [AuthGuard]
  },
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'checkout',
  //   component: ProfileComponent,
  //   canActivate: [AuthGuard]
  // }
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
];
