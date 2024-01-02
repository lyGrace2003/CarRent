import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from '../screens/start/start.component';
import { UserComponent } from '../user/user.component';
import { LandingComponent } from './landing.component';
import { LoginComponent } from '../screens/login/login.component';
import { HomeComponent } from '../screens/home/home.component';
import { BookingComponent } from '../screens/booking/booking.component';
import { AdminComponent } from '../admin/admin.component';

const routes: Routes = [
  {path: '', component: LandingComponent, children:[
    {path: '', component: StartComponent},
    {
      path: 'user', component: UserComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'booking', component: BookingComponent },
      ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: AdminComponent},
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
