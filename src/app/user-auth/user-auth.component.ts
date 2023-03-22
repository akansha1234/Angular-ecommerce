import { Component } from '@angular/core';
import { cart, Product, SignIn, SignUp } from '../data-type';
import { ProductsService } from '../services/products.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  isLogin: boolean = false;
  errorMsg: string = '';
  constructor(private user: UserService, private product: ProductsService) {}
  ngOnInit() {
    this.user.userAuthReload();
  }
  signUp(data: SignUp) {
    this.user.userSignup(data);
    this.localCartToRemoteCart();
  }
  login(data: SignIn) {
    this.user.userLogIn(data);
    this.user.errMessage.subscribe((res) => {
      if (res) {
        this.errorMsg = 'User not found. Please enter valid values';
      } else {
        console.log('no error in user');
        this.localCartToRemoteCart();
      }
    });
  }
  openLogin() {
    this.isLogin = true;
  }
  closeLogin() {
    this.isLogin = false;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    if (data) {
      let cartDataList: Product[] = JSON.parse(data);

      cartDataList.forEach((product: Product, index) => {
        let cartDataItem: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        console.log(cartDataList.length, 'len');
        delete cartDataItem.id;
        setTimeout(() => {
          this.product.addToCart(cartDataItem).subscribe((res) => {
            console.log(res);
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
    setTimeout(() => {
      this.product.fetchCart(userId);
    }, 2000);
  }
}
