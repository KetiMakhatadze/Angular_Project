import {Component, Input, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { NgFor, NgIf } from '@angular/common';
import { InfoService } from '../../services/info.service';
import { Router, RouterModule } from '@angular/router';
import {ModalComponent} from '../modal/modal.component';
import {CreatePostService} from '../../services/createPostService';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [FormsModule, HttpClientModule, NgFor, NgIf, RouterModule, ModalComponent],
  providers: [InfoService, CreatePostService]
})
export class DashboardComponent implements OnInit {
  @Input() userData: any;
  postsData: any;
  showModal: boolean = false;

  constructor(private dataService: DataService, private infoService: InfoService, private router: Router,     private createPostService: CreatePostService,) {}

  ngOnInit() {
    this.infoService.getInfo().subscribe({
      next: (response) => {
        if (response) {
          this.userData = response.user;
          this.postsData = response.posts;
          this.dataService.setUserData(response.user);
          this.dataService.setPostsData(response.posts);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        this.userData = null;
        this.postsData = null;
        this.dataService.setUserData(null);
        this.dataService.setPostsData(null);
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  handleCreatePost(data: { title: string; description: string }) {
    this.createPostService.createPost(data).subscribe({
      next: (response: any) => {
        this.postsData.push(response.post);
        this.closeModal();
      },
      error: (error: any) => {
        console.error('Error creating post:', error);
      },
    });
  }
}
