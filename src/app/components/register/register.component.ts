import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/models/registermodel';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.email]),
    confirmpassword: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });
  constructor(private service: ApiService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  hasError = (controlName: string, errorName: string) =>{
    return this.registrationForm.controls[controlName].hasError(errorName) && this.registrationForm.controls[controlName].dirty;
  }

  onSubmit(formDirective: FormGroupDirective): void{
    var registration = <RegisterModel>this.registrationForm.value;

    this.service.register(registration)
    .subscribe((data: any) => {
        this._snackBar.open("User is successfully registered. Please go to login page","",{
          duration:5000
        });
        this.registrationForm.reset();
        formDirective.resetForm();
    },
    (error)=>{
      console.log(error);
      if(error.error){
          this._snackBar.open(error.error,"",{
            duration:5000
          });
      }
      else{
        this._snackBar.open("Error occured while registration. Please try again.","",{
          duration:5000
        });
      }
    });
  }
}
