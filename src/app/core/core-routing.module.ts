import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginAltComponent } from './components/login_alt/login_alt.component';
import { TestComponent } from './components/test/test.component';


const authRoutes: Routes = [
  {
    path: 'loginalt',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginAltComponent
  },
  {
    path: 'test',
    component: TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
