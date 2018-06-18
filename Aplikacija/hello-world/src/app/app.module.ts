import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ServiceComponent } from '../app/service/service.component';
import { ServiceDetailsComponent } from '../app/service-details/service-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ClockComponent } from '../app/get-clock-time/get-clock-time.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClientXsrfModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../app/Tokens/interceptor';
import { CanActivateViaAuthGuard } from '../app/Tokens/auth.guard';
import { AppUserComponent } from '../app/app-user/app-user.component';
import { ReservationComponent } from '../app/reservation/reservation.component';
import { ProfileComponent } from '../app/profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { ManagerComponent } from 'src/app/manager/manager.component';

const routes: Routes = [
  { path: '', component: ServiceComponent },
  { path: 'service', component: ServiceComponent }, 
  { path: 'user', component: AppUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'manager', component: ManagerComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ServiceComponent,
    ServiceDetailsComponent,
    LoginComponent,
    RegisterComponent,
    ClockComponent,
    AppUserComponent,
    ReservationComponent,
    ProfileComponent,
    LogoutComponent,
    ManagerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    CanActivateViaAuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    },
    {
      provide:'CanAlwaysActivateGuard',
      useValue:()=>{ return true; }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
