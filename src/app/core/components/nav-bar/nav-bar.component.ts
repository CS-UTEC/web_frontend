import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  acceso = new Date();
  constructor(
    private authService: AuthService) {
   }

  ngOnInit(): void {
  }

  onLogout(){
    this.authService.logout();
  }

}
