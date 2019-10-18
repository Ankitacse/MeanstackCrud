import { Injectable } from '@angular/core';
;
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../models/auth-data.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private route: Router) { }
  createUser(email: string, password: string) {
    const authData: AuthData =
    {
      email: email,
      password: password
    };
    this.http
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
      });
  }

}
