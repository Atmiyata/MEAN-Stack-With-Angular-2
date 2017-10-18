import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';


@Injectable()
export class AuthGuard implements CanActivate {

  public redirectUrl;

  constructor(
    private loginService: LoginService,
    private router: Router) { }

  canActivate(
    router:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
  ) {
    if (this.loginService.loggedIn()) {
      return true
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false
    }
  }
}