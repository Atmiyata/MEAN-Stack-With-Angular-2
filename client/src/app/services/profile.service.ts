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

  getProfile(username) {
    this.createAuthenticationHeader();
    return this.http.post(this.domain + '/profile/get-info', username, this.option).map(res => res.json());
  }

  createProfile(profileInfo) {
    this.createAuthenticationHeader();
    return this.http.post(this.domain + '/profile/create-info', profileInfo, this.option).map(res => res.json());
  }

  editProfile(profileInfo) {
    this.createAuthenticationHeader();
    return this.http.put(this.domain + '/profile/edit-info', profileInfo, this.option).map(res => res.json());
  }

}
