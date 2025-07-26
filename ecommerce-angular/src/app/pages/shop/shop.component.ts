import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { Product } from '../../shared/services/products.service';
import { ProductsService } from '../../shared/services/products.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { InstagramSectionComponent } from "../../shared/components/instagram-section/instagram-section.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { FindFashionSectionComponent } from '../../shared/components/find-fashion-section/find-fashion-section.component';
@Component({
  selector: 'app-shop',
  imports: [HeaderComponent, CommonModule, ProductCardComponent, InstagramSectionComponent, FooterComponent, FindFashionSectionComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  constructor(private productService: ProductsService) {}

categories = ['men\'s clothing', 'women\'s clothing', 'electronics', 'jewelery'];
priceRanges = [
  { label: '$0 - $50', min: 0, max: 50 },
  { label: '$51 - $100', min: 51, max: 100 },
  { label: '$101 - $150', min: 101, max: 150 }
];

selectedCategory = '';
selectedPriceRange: { min: number, max: number } | null = null;
currentPage = 1;
productsPerPage = 8;
allProducts: Product[] = [];
filteredProducts: Product[] = [];

ngOnInit(): void {
  this.productService.getProducts().subscribe(data => {
    this.allProducts = data;
    this.applyFilters();
  });
}
applyFilters(): void {
  let filtered = this.allProducts;

  if (this.selectedCategory) {
    filtered = filtered.filter(product => product.category === this.selectedCategory);
  }

  if (this.selectedPriceRange) {
    const { min, max } = this.selectedPriceRange;
    filtered = filtered.filter(product => product.price >= min && product.price <= max);
  }

  // Pagination logic
  const startIndex = (this.currentPage - 1) * this.productsPerPage;
  const endIndex = startIndex + this.productsPerPage;
  this.filteredProducts = filtered.slice(startIndex, endIndex).map(product=>({
    ...product,
    description:product.description.split(' ').slice(0,10).join(' ')+'...'
  }));
}

}
