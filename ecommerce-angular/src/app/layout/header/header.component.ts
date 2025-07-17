import { Component } from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
