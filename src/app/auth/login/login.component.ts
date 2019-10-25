import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }
  isLoading = false;
  ngOnInit() {}
     onLogin(form: NgForm) {
      console.log('form', form.value);
      if (form.invalid) {
        return;
      }
      this.authService.login(form.value.email, form.value.password);
    }
}
