import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class RegisterService {
private domain = "http://localhost:8080";

  constructor(private http: Http) { }

  registerUser(user) {
    return this.http.post(this.domain +'/authentication/register', user).map(res =>
      res.json()
    );
  }
}
