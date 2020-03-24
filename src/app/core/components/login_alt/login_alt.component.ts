import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login_alt.component.html',
  styleUrls: ['./login_alt.component.css']
})
export class LoginAltComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private elementRef: ElementRef, private titleService:Title) {
    this.titleService.setTitle("Login")
   }
  
  @Output() isAlt = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });

    this.isAlt.emit(true);
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }

}
