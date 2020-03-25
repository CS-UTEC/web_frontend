import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { LoginAltComponent } from './components/login_alt/login_alt.component';
import { TestComponent } from './components/test/test.component';



@NgModule({
  declarations: [
    LoginComponent, 
    NavBarComponent,
    LoginAltComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreRoutingModule,
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
