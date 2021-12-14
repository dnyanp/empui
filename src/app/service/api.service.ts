import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginmodel';
import { RegisterModel } from '../models/registermodel';
import { ResetPasswordModel } from '../models/resetpasswordmodel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = "https://localhost:44312/api/";
  azureFuncURL = "http://localhost:7071/api/";
  constructor(private http: HttpClient) { }

  login(loginModel:LoginModel): Observable<any> {
    return this.http.post<any>(this.apiURL + "Account/Login",loginModel ).pipe(
    );
  }

  register(registrationModel:RegisterModel): Observable<any> {
    return this.http.post<any>(this.apiURL + "Account/Register",registrationModel ).pipe(
    );
  }

  resetpassword(resetModel:ResetPasswordModel): Observable<any> {
    return this.http.post<any>(this.apiURL + "Account/ResetPassword",resetModel ).pipe(
    );
  }

  forgotpassword(email:string):Observable<any>{
    return this.http.get<any>(this.apiURL + "Account/ForgotPassword?email="+email).pipe();
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiURL + "Employee/ListAllEmployees").pipe(
    );
  }

  getPaginationEmployees(pageNumber: number, pageSize: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiURL + "Employee/PaginationEmployeesList?pageNumber=" + pageNumber + "&&pageSize=" + pageSize);
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.http.post<any>(this.apiURL + "Employee/AddEmployee", employee);
  }

  editEmployee(employee: Employee): Observable<any> {
    return this.http.put<any>(this.apiURL + "Employee/UpdateEmployee/" + employee.id, employee);
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + "Employee/GetEmployee/" + id);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(this.apiURL + "Employee/DeleteEmployee/" + id);
  }
}
