import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, Product } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productData: undefined | Product;
  cartData: undefined | Product;
  productQuantity: number = 1;
  removeCart: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private product: ProductsService
  ) {}
  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('productId');
    id &&
      this.product.getProduct(id).subscribe((res) => {
        this.productData = res;
      });
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: Product) => id === item.id.toString());
      if (items.length) {
        this.removeCart = true;
      } else {
        this.removeCart = false;
      }
    }
    let user = localStorage.getItem('user');
    if (user) {
      let userId = user && JSON.parse(user)[0].id;
      this.product.fetchCart(userId);
      this.product.cartData.subscribe((res) => {
        let items = res.filter(
          (item: Product) => item.productId?.toString() === id?.toString()
        );
        if (items.length) {
          this.cartData = items[0];
          this.removeCart = true;
        }
      });
    }
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
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
        this.product.addToCart(cartData).subscribe((res) => {
          if (res) {
            this.product.fetchCart(userId);
            this.removeCart = true;
            alert('added');
          }
        });
      }
    }
  }
  removeFromCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removefromcart(productId);
      this.removeCart = false;
    } else {
      if (this.cartData) {
        this.product.removeCartFromDb(this.cartData.id).subscribe((res) => {
          if (res) {
            let user = localStorage.getItem('user');
            let userId = user && JSON.parse(user)[0].id;
            this.product.fetchCart(userId);
            this.removeCart = false;
          }
        });
      }
    }
  }
}
