import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './common/auth-guard.guard';
import { AddEmpComponent } from './components/add-emp/add-emp.component';
import { DetailEmpComponent } from './components/detail-emp/detail-emp.component';
import { EditEmpComponent } from './components/edit-emp/edit-emp.component';
import { EmpListComponent } from './components/emp-list/emp-list.component';
import { ForgotPwdComponent } from './components/forgot-pwd/forgot-pwd.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';

const routes: Routes = [
  { path: "", component: EmpListComponent, canActivate: [AuthGuardGuard] },
  { path: "add", component: AddEmpComponent, canActivate: [AuthGuardGuard] },
  { path: "edit/:id", component: EditEmpComponent, canActivate: [AuthGuardGuard] },
  { path: "detail/:id", component: DetailEmpComponent, canActivate: [AuthGuardGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgotpassword", component: ForgotPwdComponent },
  { path: "resetpassword", component: ResetPasswordComponent },
  { path: "signout", component: SignOutComponent },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
