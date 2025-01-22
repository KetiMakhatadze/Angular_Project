import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { NgIf} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {LoginService} from '../../services/loginService';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, NgIf, FormsModule, HttpClientModule],
  providers: [LoginService]
})
export class LoginComponent {
  error: string = '';

  constructor(private loginService: LoginService, private router: Router,  private dataService: DataService) {}

  email: string = '';
  password: string = '';
  errors: any = {};
  generalError: string = '';

  onLogin(): void {
    const userData = {
      email: this.email,
      password: this.password,
    };


    this.loginService.login(userData).subscribe({
      next: (response) => {
        if (response.status === '1') {
          localStorage.setItem('token', response.authorization.token);
          this.dataService.setUserData(response.user);
          this.dataService.setPostsData(response.posts);
          this.router.navigate(['/dashboard']);
        } else {
          this.generalError = response.message;
        }
      },
      error: (error) => {
        if (error.status === 422) {
          this.errors = error.error.errors;
        } else if (error.status === 401) {
          this.generalError = error.error.message;
        } else {
          this.generalError = 'Login failed.';
        }
      }
    });
  }
}
