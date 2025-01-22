import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule]
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  onRegister(): void {
    console.log('2')
  }
}
