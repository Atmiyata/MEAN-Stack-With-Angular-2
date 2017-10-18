import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';


@Injectable()
export class NotAuthGuard implements CanActivate {

    constructor(private loginService: LoginService,
        private router: Router) { }

    canActivate() {
        if (this.loginService.loggedIn()) {
            this.router.navigate(['/']);
            return false
        } else {
            return true
        }
    }
}