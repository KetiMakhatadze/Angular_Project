import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private userData = new BehaviorSubject<any>(null);
  currentUser = this.userData.asObservable();

  private postsData = new BehaviorSubject<any>(null);
  currentPosts = this.postsData.asObservable();

  constructor() { }

  setUserData(data: any) {
    this.userData.next(data);
  }

  setPostsData(data: any) {
    this.postsData.next(data);
  }

  getUserData() {
    return this.userData.getValue();
  }
}
