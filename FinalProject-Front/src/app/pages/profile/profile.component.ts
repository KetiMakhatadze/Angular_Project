import { Component } from '@angular/core';
import {InfoService} from '../../services/info.service';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from '../../services/data.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule, NgIf],
  providers: [InfoService],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  userData: any;
  constructor(private infoService: InfoService, private dataService: DataService) {}

  ngOnInit(): void {
    this.infoService.getInfo().subscribe(
      (data) => {
        this.userData = data.user;
        this.dataService.setUserData(data.user)
      },
      (error) => {
        console.error('Error fetching user info:', error);
      }
    );
  }
}
