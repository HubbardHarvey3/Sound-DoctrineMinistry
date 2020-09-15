import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginURL = "https://sound-doctrineministry.org/api/login"

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  loginUser(user) {
    return this.http.post<any>(this._loginURL, user)
  }
  loggedIn() {
    // the !! return a boolean
    return !!localStorage.getItem('token')
  }
  getToken() {
    return localStorage.getItem('token')
  }
  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/'])
  }
}
