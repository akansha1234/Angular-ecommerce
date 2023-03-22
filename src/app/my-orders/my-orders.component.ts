import { Component } from '@angular/core';
import { order } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  orderData: order[] | undefined;
  constructor(private product: ProductsService) {}
  ngOnInit() {
    this.getOrderList();
  }
  cancelOrder(orderId: number | undefined) {
    console.warn(orderId);
    orderId &&
      this.product.deleteOrder(orderId).subscribe((res) => {
        if (res) {
          this.getOrderList();
        }
      });
  }
  getOrderList() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    this.product.getOrder(userId).subscribe((res) => {
      if (res) {
        this.orderData = res;
      }
    });
  }
}
