import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EmpListComponent } from './components/emp-list/emp-list.component';
import { AddEmpComponent } from './components/add-emp/add-emp.component';
import { AppRoutingModule } from './app-routing.module';
import { EditEmpComponent } from './components/edit-emp/edit-emp.component';
import { DetailEmpComponent } from './components/detail-emp/detail-emp.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptor } from './common/JwtInterceptor';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPwdComponent } from './components/forgot-pwd/forgot-pwd.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpListComponent,
    AddEmpComponent,
    EditEmpComponent,
    DetailEmpComponent,
    ConfirmDialogComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPwdComponent,
    ResetPasswordComponent,
    SignOutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDividerModule,
    MatCardModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true}
  ],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
