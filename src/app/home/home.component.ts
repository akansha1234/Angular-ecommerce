import { Component } from '@angular/core';
import { cart, Product } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  popularProducts: undefined | Product[];
  trendyProducts: undefined | Product[];
  productData: undefined | Product;
  constructor(private product: ProductsService) {}
  ngOnInit() {
    this.product.popularProducts().subscribe((res) => {
      if (res) {
        this.popularProducts = res;
      }
    });

    this.product.trendyProducts().subscribe((res) => {
      if (res) {
        this.trendyProducts = res;
      }
    });
  }
  addToCart(id: number) {
    this.product.getProduct(id.toString()).subscribe((res) => {
      this.productData = res;

      if (this.productData) {
        this.productData.quantity = 1;
        if (!localStorage.getItem('user')) {
          this.product.localAddToCart(this.productData);
          //console.log(this.removeCart, 'remcart');
        } else {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user)[0].id;
          let cartData: cart = {
            ...this.productData,
            userId,
            productId: this.productData.id,
          };
          delete cartData.id;
          setTimeout(() => {
            this.product.addToCart(cartData).subscribe((res) => {
              if (res) {
                this.product.fetchCart(userId);
                alert('added');
              }
            });
          }, 1000);
        }
      }
    });
  }
}
