import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService) { }
  isLoading = false;
  ngOnInit() {
  }
  onSignup(form: NgForm) {
    console.log('form',form.value);
      if(form.invalid){
            return;
       }
     this.authService.createUser(form.value.email,form.value.paswword);
   }
}
