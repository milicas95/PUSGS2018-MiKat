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
import { RouterModule, Routes } from '@angular/router';
import { HttpClientXsrfModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../app/Tokens/interceptor';
import { CanActivateViaAuthGuard } from '../app/Tokens/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    ServiceComponent,
    ServiceDetailsComponent,
    LoginComponent,
    RegisterComponent,
    ClockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule
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
