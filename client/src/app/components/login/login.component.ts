import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';


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

  private userLogin = {
    "username": '',
    "password": ''
  };
  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    this.userLogin.username = this.user.username;
    this.userLogin.password = this.user.password;
    this.loginUser();
  }

  private loginUser() {
    this.loginService.loginUser(this.userLogin).subscribe(data => {
      console.log(data);
    });
  }
}
