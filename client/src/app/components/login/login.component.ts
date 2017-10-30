import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import {Router} from '@angular/router';
import {AuthGuard} from '../../guards/auth.guard';
import { ProfileService } from '../../services/profile.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public form: FormGroup;
  public message;
  public messageClass;
  public user: any = [];
  public previousUrl;
  private userLogin = {
    "username": '',
    "password": ''
  };
  public username:any;


  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router:Router,
    private authGuard:AuthGuard) {
    this.createForm();
  }

  ngOnInit() {
    if(this.authGuard.redirectUrl){
      this.messageClass = 'alert alert-danger';
      this.message= "Please Login First";
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }

  public createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public submitForm() {
    this.userLogin.username = this.user.username;
    this.userLogin.password = this.user.password;
    this.loginUser();
   
    }

  private loginUser() {
    this.loginService.loginUser(this.userLogin).subscribe(res => {
      this.message = res.message;
      if (!res.success) {
        this.messageClass = "alert alert-danger";
      } else {
        this.messageClass = "alert alert-success";
         this.loginService.storeUserData(res.token,res.user);
         setTimeout(()=>{
           if(this.previousUrl){
             this.router.navigate([this.previousUrl]);
           }else{
            this.router.navigate(['/dashboard']);
           }
          },2000);  
        }
    });
  }
}
