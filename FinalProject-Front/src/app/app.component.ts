import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { DataService } from './services/data.service';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    NgClass,
    NgIf,
    RouterModule
  ],
  standalone: true
})
export class AppComponent {
  title = 'FinalProject';
  userData: any;
  postsData: any;
  isAuthenticated: boolean = false;
  currentRoute: string = '';

  constructor(private router: Router, private dataService: DataService) {
    this.dataService.currentUser.subscribe(userData => {
      this.userData = userData;
      this.isAuthenticated = !!userData;
    });

    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });

    this.dataService.currentPosts.subscribe(postsData => {
      this.postsData = postsData;
    });
  }

  login(): void {
    this.dataService.setUserData({ name: 'John Doe', email: 'john@example.com' });
    this.dataService.setPostsData([{ title: 'Post 1' }, { title: 'Post 2' }]);

    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.dataService.setUserData(null);
    this.dataService.setPostsData(null);
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
