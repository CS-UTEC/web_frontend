import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    LoginComponent, 
    NavBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreRoutingModule
  ],
  exports: [
    NavBarComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
  ]
})
export class CoreModule { }
