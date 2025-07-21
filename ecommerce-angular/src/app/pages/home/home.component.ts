import { Component } from '@angular/core';
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { BrandsSectionComponent } from "./brands-section/brands-section.component";

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent, BrandsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
