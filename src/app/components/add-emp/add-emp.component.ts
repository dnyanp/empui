import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  addEmployeeForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mobileNo: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private service: ApiService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  hasError = (controlName: string, errorName: string) =>{
    return this.addEmployeeForm.controls[controlName].hasError(errorName);
  }

  onSubmit(): void {
    var emp = <Employee>this.addEmployeeForm.value;
    this.service.addEmployee(emp)
      .subscribe((data: any) => {
        if (data.successStatus) {
          this._snackBar.open("Successfully added the employee.", "", {
            duration: 5000
          });
          this.router.navigate(['/']);
        }
        else {
          //show error message
          this._snackBar.open(data.message, "", {
            duration: 5000
          });
        }
      },
        (error) => {
          debugger
          if (error.status == 400) {
            this._snackBar.open("Please provide valid values.", "", {
              duration: 5000
            });
          }
          else if (error.status == 401) {
            this._snackBar.open("Your session expired. Login again.","",{
              duration:5000
            });
            localStorage.removeItem("empmgmt_token");
            this.router.navigateByUrl("login");
          }
          else {
            this._snackBar.open("Error occured while adding employee. Please try again.", "", {
              duration: 5000
            });
          }
        });
  }
}
