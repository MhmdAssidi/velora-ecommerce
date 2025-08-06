import { Component } from '@angular/core';
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { BrandsSectionComponent } from "./brands-section/brands-section.component";
import { DealsSectionComponent } from "./deals-section/deals-section.component";
import { InstagramSectionComponent } from "../../shared/components/instagram-section/instagram-section.component";
import { TrendingProductsComponent } from "./trending-products/trending-products.component";
import { FindFashionSectionComponent } from "../../shared/components/find-fashion-section/find-fashion-section.component";

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent, BrandsSectionComponent, DealsSectionComponent, InstagramSectionComponent, TrendingProductsComponent, FindFashionSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
