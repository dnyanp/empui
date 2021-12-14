import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { ApiService } from 'src/app/service/api.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {
  totalCount: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  employees: Employee[] = [];
  dataSource: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'mobileNo', 'email', 'isActive', 'action'];

  constructor(private service: ApiService, private router: Router, private route: ActivatedRoute,
    public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource(this.employees);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      const pagesize = Number(param['pageSize']);
      const pagenum = Number(param['pageNumber']);
      this.pageSize = isNaN(pagesize) || pagesize < 1 ? 10 : pagesize;
      this.pageIndex = isNaN(pagenum) || pagenum < 1 ? 0 : pagenum - 1;
      this.getServerData(this.pageIndex + 1, this.pageSize);
    });
  }

  actionBtnClick(emp: Employee, action: string) {
    if (action == 'edit') {
      this.router.navigate(['/edit/' + emp.id]);
    }
    else if (action == 'detail') {
      this.router.navigate(['/detail/' + emp.id]);
    }
    else if (action == 'delete') {
      this.deleteEmpWithConfirmation(emp.firstName + " " + emp.lastName, emp.id);
    }
  }

  getPageData(event?: PageEvent) {
    this.pageSize = event?.pageSize != null ? event?.pageSize : this.pageSize;
    this.pageIndex = event?.pageIndex != null ? event?.pageIndex : this.pageIndex;
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { 'pageSize': this.pageSize, 'pageNumber': this.pageIndex + 1 },
      queryParamsHandling: 'merge'
    });
  }

  getServerData(pageNumber: number, pageSize: number): void {
    this.service.getPaginationEmployees(pageNumber, pageSize)
      .subscribe((data: any) => {
        if (data.successStatus) {
          this.employees = data.employees;
          this.totalCount = data.totalCount;
        }
        else {
          this._snackBar.open(data.message, "", {
            duration: 5000
          });
        }
      },
        (error) => {
          if (error.status == 401) {
            this._snackBar.open("Your session expired. Login again.","",{
              duration:5000
            });
            localStorage.removeItem("empmgmt_token");
            this.router.navigateByUrl("login");
          }
          else {
            this._snackBar.open(error.error, "", {
              duration: 5000
            });
          }
        });
  }

  deleteEmpWithConfirmation(empName: string, id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: empName
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.service.deleteEmployee(id).subscribe((data: any) => {
          if (data.successStatus) {
            this.getServerData(this.pageIndex + 1, this.pageSize);
            this._snackBar.open("Successfully deleted the employee.", "", {
              duration: 5000
            });
          }
          else {
            //show error message
            this._snackBar.open(data?.message, "", {
              duration: 5000
            });
          }
        });
      }
    });
  }
}
