import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit {
  editEmployeeForm = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    mobileNo: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    isActive: new FormControl(true),
  });

  constructor(private service: ApiService, private route: ActivatedRoute,
    private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const empId = Number(this.route.snapshot.paramMap.get('id'));
    if(!isNaN(empId)){
      this.service.getEmployee( empId)
      .subscribe((data: any) => {
        let employee = <Employee>data.employee;
        let controls = this.editEmployeeForm.controls;
        controls["id"].setValue(employee.id);
        controls["firstName"].setValue(employee.firstName);
        controls["lastName"].setValue(employee.lastName);
        controls["mobileNo"].setValue(employee.mobileNo);
        controls["email"].setValue(employee.email);
        controls["isActive"].setValue(employee.isActive);
      },
      (error)=>{
        if(error.status == 401){
          this.snackBar.open("Your session expired. Login again.","",{
            duration:5000
          });
          localStorage.removeItem("empmgmt_token");
          this.router.navigateByUrl("login");
        }
        else{
          this.snackBar.open(error.error, "", {
            duration: 5000
          });
        }});
    }
    else{
      this.snackBar.open("Provide valid employee id in URL.","",{
        duration:5000
      });
    }
  }

  hasError = (controlName: string, errorName: string) =>{
    return this.editEmployeeForm.controls[controlName].hasError(errorName);
  }

  cancelClick():void{
    this.router.navigate(['/']);
  }

  onSubmit():void{
    if(this.editEmployeeForm.valid){
      var emp = <Employee>this.editEmployeeForm.value;

    this.service.editEmployee(emp)
    .subscribe((data: any) => {
      if(data.successStatus){
        this.snackBar.open("Successfully edited the Employee.","",{
          duration:5000
        });
        //redirect to emplist page
        this.router.navigate(['/']);
      }
      else{
        //show error message
        this.snackBar.open(data.message,"",{
          duration:5000
        });
      }
    },
    (error)=>{
      if(error.status == 400){
        this.snackBar.open("Please provide valid values.","",{
          duration:5000
        });
      }
      else if(error.status == 401){
        this.snackBar.open("Your session expired. Login again.","",{
          duration:5000
        });
        localStorage.removeItem("empmgmt_token");
        this.router.navigateByUrl("login");
      }
      else{
        this.snackBar.open("Error occured while editing employee. Please try again.","",{
          duration:5000
        });
      }
    });
    }
  }
}
