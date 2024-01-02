  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './screens/signup/signup.component';
import { LoginComponent } from './screens/login/login.component';
import { LandingComponent } from './landing/landing.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';

  const routes: Routes = [
    {path: '', redirectTo: 'landing', pathMatch: 'full'},
    {path: 'landing', component: LandingComponent},
    {path: 'user', component: UserComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'admin', component: AdminComponent},

  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
