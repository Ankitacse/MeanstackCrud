import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../models/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private isAuthenticated = false;
  private authStatusListner = new Subject<boolean>();
  constructor(private http: HttpClient, private router:Router) { }
  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getAuthStatusListner() {
    return this.authStatusListner.asObservable();
  }
  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    }
    console.log('authdata---', authData);
    this.http.post('http://localhost:3000/api/users/signup', authData).subscribe(response => {
      console.log('SignUp Response', response);
    });
  }

  login(email: string, password: string) {
    const authData: AuthData =
    {
      email: email,
      password: password
    };
    this.http.post<{ token: string }>('http://localhost:3000/api/users/login', authData).subscribe(response => {
      console.log('Login Response', response);
      const token = response.token;
      this.token = token;

      if (token) {
        this.isAuthenticated = true;
        this.authStatusListner.next(true);
        this.router.navigate(['/']);
      }
    });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    this.router.navigate(['/']);
  }

}
