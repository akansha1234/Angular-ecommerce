import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchProd: undefined | Product[];
  cartItems = 0;
  constructor(private route: Router, private search: ProductsService) {}
  ngOnInit() {
    this.route.events.subscribe((val: any) => {
      //console.log(val, 'val');
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore);
          this.sellerName = sellerData[0].name;
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          //console.log(userData, 'data');
          this.userName = userData[0].name;
          this.menuType = 'user';

          this.search.fetchCart(userData[0].id);
        } else {
          this.menuType = 'default';
        }
      }
    });

    /*this code is for refresh, while refreshing the cart length should become as it is when user is not logged in */
    let cartLength = localStorage.getItem('localCart');
    if (cartLength) {
      this.cartItems = JSON.parse(cartLength).length;
    }
    /*this code is for to correctly populate the cart on button click of add to cart  */
    this.search.cartData.subscribe((res) => {
      this.cartItems = res.length;
    });
  }
  logOut() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
    this.search.cartData.emit([]);
  }
  searchProduct(event: any) {
    const element = event.target.value;
    this.search.searchProducts(element).subscribe((result) => {
      if (result.length > 5) {
        result.length = 5;
      }

      this.searchProd = result;
    });
  }
  hideSearch() {
    this.searchProd = undefined;
  }
  submitInput(val: string) {
    this.route.navigate([`search/${val}`]);
  }
  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }
  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/']);
  }
}
