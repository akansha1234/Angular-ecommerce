import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    tax: 0,
    delivery: 0,
    discount: 0,
    totalPrice: 0,
  };
  constructor(private product: ProductsService, private route: Router) {}
  ngOnInit() {
    this.getCartPage();
  }
  removeCart(cartId: number | undefined) {
    cartId &&
      this.product.removeCartFromDb(cartId).subscribe((res) => {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user)[0].id;
        this.getCartPage();
        this.product.fetchCart(userId);
      });
  }
  checkout() {
    this.route.navigate(['/checkout']);
  }
  getCartPage() {
    this.product.getCartData().subscribe((res) => {
      this.cartData = res;
      let price = 0;
      this.cartData.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      (this.priceSummary.price = price),
        (this.priceSummary.discount = price / 10),
        (this.priceSummary.delivery = 100),
        (this.priceSummary.tax = price / 10);
      this.priceSummary.totalPrice = price + price / 10 + 100 - price / 10;
      if (!this.cartData.length) {
        this.route.navigate(['/']);
      }
    });
  }
}
