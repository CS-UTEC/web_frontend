import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  returnUrl: string;


  constructor(
    private formBuilder: FormBuilder, 
    private elementRef: ElementRef,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private titleService:Title){ 
      this.titleService.setTitle("Login")

    }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get control() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.authService.login(this.control.username.value, this.control.password.value)
    .pipe(first())
    .subscribe(
      data => {
        if (this.returnUrl == '/'){
          this.router.navigate(['/mapa']);
        }else {
          this.router.navigate([this.returnUrl]);
        }
      },
      err => {
        this.openSnackBar('Correo o contraseña inválido', 'Cerrar');
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
