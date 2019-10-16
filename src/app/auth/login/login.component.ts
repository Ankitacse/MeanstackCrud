import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  isLoading = false;
  ngOnInit() {
  }
 onLogin(form:NgForm){
console.log('form',form.value);
 }
}
