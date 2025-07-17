import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { ButtonComponent } from "../../shared/components/button/button.component";

@Component({
  selector: 'app-header',
  imports: [MatToolbar, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
