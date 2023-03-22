import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignIn, SignUp } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(data: SignUp) {
    this.http
      .post(
        'https://angular663pug-xlrg--3000.local-credentialless.webcontainer.io/seller',
        data,
        {
          observe: 'response',
        }
      )
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        console.log(this.isSellerLoggedIn.next, 'op');
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userSignIn(data: SignIn) {
    this.http
      .get(
        `https://angular663pugrxnjpk-szhz--3000.local-credentialless.webcontainer.io/seller?email=${data.email}&password=${data.password}`,
        {
          observe: 'response',
        }
      )
      .subscribe((result: any) => {
        if (result && result.body.length) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          console.warn('login failed');
          this.isLoginError.emit(true);
          console.log(this.isLoginError);
        }
      });
  }
}
