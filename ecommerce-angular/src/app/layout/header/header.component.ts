import { Component } from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-header',
  imports: [ButtonComponent,RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public authService: AuthenticationService,private router: Router) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
