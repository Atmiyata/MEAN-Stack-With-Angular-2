import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import {RegisterService} from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public form :FormGroup;
  public user:any=[];
  public passwordNotMatch:boolean;

   registerUser = {
     username:'',
     email:'',
     password:''
   };
      
  constructor(
    private formBuilder:FormBuilder,
    private registerService:RegisterService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  public createForm(){
    this.form = this.formBuilder.group({
      username:['',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ])],
      email:['',Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(40),
        this.validateEmail
      ])],
      password:['',Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ])],
      confirm:['',Validators.required]
    });
  }

  public validateEmail(controls){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(controls.value)){
      return null;
    }else{
      return {'validateEmail':true}
    }
  }

  public matchingPasswords(){
    if(this.user.password !== this.user.confirm){
       this.passwordNotMatch = true;
     }else{
       this.passwordNotMatch = false;
     }
  }

  public submitForm(){
    this.matchingPasswords();
    this.registerUser.username = this.user.username;
    this.registerUser.email = this.user.email;
    this.registerUser.password = this.user.password;
    if(this.passwordNotMatch == false){
      
      this.registerService.registerUser(this.registerUser).subscribe(res =>{
           console.log(res);
 });
    }
  }
}
