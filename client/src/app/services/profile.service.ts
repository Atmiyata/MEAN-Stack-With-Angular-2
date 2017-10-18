import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {
  authToken;
  user;
  private option;
  private domain = "http://localhost:8080";
  constructor(private http: Http) { }

  public createAuthenticationHeader() {
    this.loadToken();
    this.option = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    });

  }

  public loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
    const user = localStorage.getItem('user');
    this.user = user;

  }

  public getProfile() {
    this.createAuthenticationHeader();
    return this.http.get(this.domain + '/authentication/profile', this.option).map(res => res.json());
  }

}
