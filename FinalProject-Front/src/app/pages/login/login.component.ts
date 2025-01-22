import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';


  onLogin(): void {
    console.log('here')
  }
}
