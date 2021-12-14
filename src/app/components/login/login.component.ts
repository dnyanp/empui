import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/loginmodel';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.email]),
    rememberme: new FormControl(false),
    password: new FormControl('',Validators.required)
  });
  constructor(private service: ApiService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  hasError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  onSubmit(): void{
    var logincred = <LoginModel>this.loginForm.value;

    this.service.login(logincred)
    .subscribe((data: any) => {
      debugger
        this._snackBar.open("Successfully login.","",{
          duration:5000
        });
        localStorage.setItem('empmgmt_token', data.token);
        this.router.navigate(['/']);
    },
    (error)=>{
      if(error.error){
        this._snackBar.open(error.error,"",{
          duration:5000
        });
      }
      else{
        this._snackBar.open("Error occured while login. Please try again.","",{
          duration:5000
        });
      }
    });
  }
}
