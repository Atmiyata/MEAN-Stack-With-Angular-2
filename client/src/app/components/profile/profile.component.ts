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
  public languages = [];
  public skills = [];
  public createNewUser: boolean;
  request = {
    username: 'chandu',
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

  getProfileRequest = {
    username: ''
  };

  constructor(private formBuilder: FormBuilder,
    private profileService: ProfileService) {
    this.createForm();
  }

  ngOnInit() {
    this.getProfile();

  }

  public getUserName() {
    return localStorage.getItem('user');
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
      username: this.user.username,
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
    } else {
      this.editProfile();
    }

  }

  public addLanguage(addLanguage) {
    this.languages.push(this.user.languageKnown);
    this.user.languageKnown = '';
  }

  public removeLanguage(language) {
    this.languages.splice(this.languages.indexOf(language), 1);
  }

  public addSkill() {
    this.skills.push(this.user.skill);
    this.user.skill = '';
  }
 
  public removeSkill(skill){
    this.skills.splice(this.skills.indexOf(skill),1)
  }

  private createProfile() {
    this.profileService.createProfile(this.request).subscribe(data => {
      this.getProfile();
    });
  }

  private editProfile() {
    this.profileService.editProfile(this.request).subscribe(data => {
      if (data.success) {
        this.getProfile();
      }
    });
  }

  private getProfile() {
    this.user = [];
    this.profileService.getProfile(this.getUserName()).subscribe(data => {
      if (data.success == false) {
        this.createNewUser = true;
      } else {
        this.createNewUser = false;
        this.user.name = data.userInfo.name;
        this.user.dob = data.userInfo.dob;
        this.user.gender = data.userInfo.gender;
        this.user.primaryOccupation = data.userInfo.primaryOccupation;
        this.user.secondaryOccupation = data.userInfo.secondaryOccupation;
        this.skills = data.userInfo.skills;
        this.user.email = data.userInfo.email;
        this.user.phone = data.userInfo.phone;
        this.languages = data.userInfo.languageKnown;
        this.user.workExperience = data.userInfo.workExperience;
        this.user.overview = data.userInfo.overview;
        this.user.username = data.userInfo.username;
      }
    });
  }
}
