import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../models/auth-data.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token:string;
  constructor(private http: HttpClient) { }
  getToken(){
    return this.token;
  }
  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    }
    console.log('authdata---',authData);
    this.http.post('http://localhost:3000/api/users/signup', authData).subscribe(response => {
        console.log('SignUp Response', response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData =
    {
      email: email,
      password: password
    }
    this.http.post<{token:string}>('http://localhost:3000/api/users/login', authData).subscribe(response => {
        console.log('Login Response',response);
        const token = response.token;
        this.token = token;
      });
  }

}
