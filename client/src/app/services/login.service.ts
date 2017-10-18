 import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class LoginService {
  private domain = "http://localhost:8080";
  private authToken;
  private user;
    constructor(private http: Http) { }
  
    loginUser(user) {
      return this.http.post(this.domain +'/authentication/login', user).map(res =>
        res.json()
      );
    }

    storeUserData(token, user) {
      localStorage.setItem('token',token);
      localStorage.setItem('user',JSON.stringify(user));
      this.authToken = token;
      this.user = user;
    }

     logout() {
      this.authToken = null;
      this.user = null;
      localStorage.clear();
    }

    loggedIn() {
      return tokenNotExpired();
    }
    
}
