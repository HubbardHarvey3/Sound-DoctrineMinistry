import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = { "email": "", "password": "" }
  display = "none"
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    // DELETE THESE CONSOLE LOGS BEFORE MOVING INTO PROD
    console.log("Login Attempt Sent")
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/upload'])
      },
      err => {
        //display the error if there is an error.
        this.throwErrorAlert()
      }
    )


  }
  // changes the display variable to flex which overwrites the display none on the error message
  throwErrorAlert() {
    this.display = 'flex'
  }

}
