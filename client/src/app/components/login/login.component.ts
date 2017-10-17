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
public user:any = [];
  constructor( private formBuilder: FormBuilder,
    private loginService:LoginService) { }

  ngOnInit() {
  }
 
  loginUser() {
    this.loginService.loginUser(this.user).subscribe(data =>{
       
    });
  }
}
