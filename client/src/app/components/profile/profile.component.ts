import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public form: FormGroup;
  public user: any = [];
  public username = 'rikita123';
  public languages = [];
  public skills = [];
  public createNewUser: boolean;
  request = {
    username: 'rikita123',
    name: '',
    dob: '',
    gender: '',
    primaryOccupations: '',
    secondaryOccupation: '',
    skills: [],
    phone: '',
    email: '',
    languageKnown: [],
    workExperience: '',
    overview: ''
  };

  constructor(private formBuilder: FormBuilder,
    private profileService: ProfileService) {
    this.createForm();
  }

  ngOnInit() {
    this.getProfile();
  }

  public createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(40),
        this.validateEmail])],
      dob: [],
      gender: [],
      primaryOccupation: [],
      secondaryOccupation: [],
      skill: [],
      phone: [],
      languageKnown: [],
      workExperience: [],
      overview: []
    });
  }


  public validateEmail(controls) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(controls.value)) {
      return null;
    } else {
      return { 'validateEmail': true }
    }
  }

  public updateProfile() {
    this.request = {
      username: 'rikita123',
      name: this.user.name,
      dob: this.user.dob,
      gender: this.user.gender,
      primaryOccupations: this.user.primaryOccupation,
      secondaryOccupation: this.user.secondaryOccupation,
      skills: this.skills,
      phone: this.user.phone,
      email: this.user.email,
      languageKnown: this.languages,
      workExperience: this.user.workExperience,
      overview: this.user.overview
    };
    if (this.createNewUser) {
      this.createProfile();
    }

  }

  public addLanguage(addLanguage) {
    this.languages.push(this.user.languageKnown);

  }

  public addSkill() {
    this.skills.push(this.user.skill);

  }

  private createProfile() {
    this.profileService.createProfile(this.request).subscribe(data => {
      console.log(data);
    });
  }

  private getProfile() {
    this.profileService.getProfile({ username: this.username }).subscribe(data => {
      if (data.success == false) {
        this.createNewUser = true;
      } else {
        this.createNewUser = false;
      }
    });
  }
}
