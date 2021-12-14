import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordModel } from 'src/app/models/resetpasswordmodel';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    confirmpassword: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  token: string | null = "";

  constructor(private service: ApiService, private _snackBar: MatSnackBar,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    debugger
    this.token = this.route.snapshot.queryParamMap.get("token");
    const email = this.route.snapshot.queryParamMap.get("email");
    this.resetPasswordForm.controls["email"].setValue(email);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.controls[controlName].hasError(errorName);
  }

  onSubmit(): void {
    var resetPassword = <ResetPasswordModel>this.resetPasswordForm.value;
    resetPassword.token = this.token ? this.token : "";

    this.service.resetpassword(resetPassword)
      .subscribe((data: any) => {
        debugger
        this._snackBar.open("Successfully reset password.", "", {
          duration: 5000
        });
        this.resetPasswordForm.reset();
        this.router.navigate(['/login']);
      },
        (error) => {
          console.log(error);
          if (error.error) {
            this._snackBar.open(error.error, "", {
              duration: 5000
            });
          }
          else {
            this._snackBar.open("Error occured while registration. Please try again.", "", {
              duration: 5000
            });
          }
        });
  }

}
