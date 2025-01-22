import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { AppRoutingModule } from './app.routes';
import {ProfileComponent} from './pages/profile/profile.component';
import {ModalComponent} from './pages/modal/modal.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ModalComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
