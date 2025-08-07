import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";

import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { CommonModule } from '@angular/common'; 
import { CartService } from '../../shared/services/cart.service';
import { SearchService } from '../../shared/services/search.service';
@Component({
  selector: 'app-header',
  imports: [ButtonComponent, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthenticationService,private router: Router,private cartService:CartService, private SearchService:SearchService) {}
  
  cartCount=0;
  ngOnInit(): void {
      this.cartService.cartCount$.subscribe(count=>{
        this.cartCount=count;
      })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
showSearchInput=false;
toggleSearchInput(){
this.showSearchInput=!this.showSearchInput;
}
 onSearch(event:Event) {
  const input = event.target as HTMLInputElement;
  console.log('Search input:', input.value);
  this.SearchService.setSearchTerm(input.value);
  }
}
