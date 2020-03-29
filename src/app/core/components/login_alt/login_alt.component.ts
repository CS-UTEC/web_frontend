import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login_alt.component.html',
  styleUrls: ['./login_alt.component.css']
})
export class LoginAltComponent implements OnInit {

  @Output() isAlt = new EventEmitter<boolean>();

  returnUrl: string;
  loginForm: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder, 
    private elementRef: ElementRef, 
    private titleService:Title,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
    ) {
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
          this.router.navigate(['/dashboard']);
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

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }

}
