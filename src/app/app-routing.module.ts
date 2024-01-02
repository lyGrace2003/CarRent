  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './screens/signup/signup.component';
import { HomeComponent } from './screens/home/home.component';
import { BookingComponent } from './screens/booking/booking.component';
import { LoginComponent } from './screens/login/login.component';

  const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'booking', component: BookingComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},

  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
