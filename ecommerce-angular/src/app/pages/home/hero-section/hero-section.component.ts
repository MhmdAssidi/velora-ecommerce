import { Component } from '@angular/core';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [ButtonComponent,RouterModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {

}
