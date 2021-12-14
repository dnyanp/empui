import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-detail-emp',
  templateUrl: './detail-emp.component.html',
  styleUrls: ['./detail-emp.component.css']
})
export class DetailEmpComponent implements OnInit {

  id = new FormControl(0);
  firstName = new FormControl('');
  lastName = new FormControl('');
  mobileNo = new FormControl('');
  email = new FormControl('');
  isActive = new FormControl(true);

  constructor(private service: ApiService, private route: ActivatedRoute
    , private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const empId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(empId)) {
      this.service.getEmployee(empId)
        .subscribe((data: any) => {
          var employee = <Employee>data.employee;
          this.id.setValue(employee.id);
          this.firstName.setValue(employee.firstName);
          this.lastName.setValue(employee.lastName);
          this.mobileNo.setValue(employee.mobileNo);
          this.email.setValue(employee.email);
          this.isActive.setValue(employee.isActive);
        });
    }
    else {
      this.snackBar.open("Employee not found.", "", {
        duration: 5000
      });
      this.router.navigate(['/']);
    }
  }
}
