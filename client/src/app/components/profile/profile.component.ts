import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public username;
  public email;

  constructor(private profileService: ProfileService) {

  }

  ngOnInit() {
    this.profile();
  }

  private profile() {
    this.profileService.getProfile().subscribe(data => {
      this.username = data.user.username;
      this.email = data.user.email;
    })
  }
}
