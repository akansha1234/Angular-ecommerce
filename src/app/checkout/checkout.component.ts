import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cart, checkout, order } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  orderMessage: string | undefined;
  totalPrice: number = 0;
  cartData: cart[] | undefined;
  constructor(private product: ProductsService, private route: Router) {}
  ngOnInit() {
    this.product.getCartData().subscribe((res) => {
      this.cartData = res;
      let price = 0;
      res.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
        this.totalPrice = price + price / 10 + 100 - price / 10;
      });
      console.warn(this.totalPrice);
    });
  }
  orderNow(data: checkout) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    let orderData: order = {
      ...data,
      totalPrice: this.totalPrice,
      userId,
      id: undefined,
    };
    this.cartData?.forEach((item) => {
      setTimeout(() => {
        item.id && this.product.removeOrders(item.id);
      }, 700);
    });
    this.product.orderProduct(orderData).subscribe((res) => {
      if (res) {
        this.orderMessage = 'Order is successfully placed';
        setTimeout(() => {
          this.orderMessage = undefined;
          this.route.navigate(['/my-order']);
        }, 4000);
      }
    });
  }
}
