import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  isResetLinkPresent: boolean = false;
  token: string = "";
  resetLink: string = "";
  queryparams: any = {};

  constructor(private service: ApiService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  public hasError = (errorName: string) => {
    return this.email.hasError(errorName);
  }

  onSubmit(): void {
    this.service.forgotpassword(this.email.value)
      .subscribe((data: any) => {
        this.isResetLinkPresent = true;
        this.token = data.token;
        this.queryparams = { token: this.token, email: this.email.value };
        this.resetLink = "/resetpassword?email=" + data.email + "&&token=" + this.token;

        this._snackBar.open("Please click on Reset Link and change password.", "", {
          duration: 5000
        });
      },
        (error) => {
          if (error.error) {
            this._snackBar.open(error.error, "", {
              duration: 5000
            });
          }
          else {
            this._snackBar.open("Error occured while resetting password. Please try again.", "", {
              duration: 5000
            });
          }
        });
  }
}
