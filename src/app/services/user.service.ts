import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  errMessage = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  userSignup(data: SignUp) {
    this.http
      .post(
        'https://angular663pugyhdlqd-bihv--3000.local-credentialless.webcontainer.io/users',
        data,
        {
          observe: 'response',
        }
      )
      .subscribe((res) => {
        if (res) {
          localStorage.setItem('user', JSON.stringify(res.body));
          this.router.navigate(['/']);
        }
      });
  }
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
  userLogIn(data: SignIn) {
    this.http
      .get<SignUp[]>(
        `https://angular663pugyhdlqd-bihv--3000.local-credentialless.webcontainer.io/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((res) => {
        if (res && res.body && res.body.length) {
          localStorage.setItem('user', JSON.stringify(res.body));
          this.errMessage.emit(false);
          this.router.navigate(['/']);
        } else {
          this.errMessage.emit(true);
        }
      });
  }
}
