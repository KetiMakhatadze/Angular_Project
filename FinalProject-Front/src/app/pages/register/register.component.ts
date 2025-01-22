import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RegisterService} from '../../services/registerService';
import {Router} from '@angular/router';
import {NgFor, NgIf} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule, NgIf, NgFor, FormsModule, HttpClientModule],
  providers: [RegisterService]
})
export class RegisterComponent {
  error: string = '';
  constructor(private registerService: RegisterService, private router: Router) {}


  name: string = '';
  email: string = '';
  password: string = '';
  errors: any = {};
  generalError: string = '';

  onRegister(): void {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.registerService.register(userData).subscribe({
      next: (response) => {
        alert(`Welcome, ${this.name}! Registration successful.`);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        if (error.status === 422) {
          this.errors = error.error.errors;

          if (typeof this.errors === 'object') {
            const firstErrorKey = Object.keys(this.errors)[0];
            if (firstErrorKey) {
              this.errors = { [firstErrorKey]: [this.errors[firstErrorKey][0]] };
            }
          }
        } else {
          this.generalError = error.message;
          console.error('Registration failed:', error);
        }
      }
    });
  }
}
