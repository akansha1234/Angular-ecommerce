import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignIn, SignUp } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent {
  showLogin: boolean = false;
  showError: string = '';
  constructor(private seller: SellerService, private router: Router) {}
  ngOnInit() {
    this.seller.reloadSeller();
  }
  signUp(data: SignUp) {
    if (data.name !== '' && data.email !== '' && data.password !== '') {
      this.seller.userSignUp(data);
    }
  }
  signIn(data: SignIn) {
    this.seller.userSignIn(data);
    if (this.seller.isLoginError) {
      this.showError = 'Email or Password is incorrect';
      console.log(this.showError);
    }
  }
  openLogin() {
    this.showLogin = true;
  }
  closeLogin() {
    this.showLogin = false;
  }
}
