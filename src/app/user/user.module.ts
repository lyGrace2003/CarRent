import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment.development';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HomeComponent } from '../screens/home/home.component';
import { BookingComponent } from '../screens/booking/booking.component';


@NgModule({
  declarations: [
    UserComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    BookingComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    provideFirebaseApp(()=>initializeApp(environment.firebase)),
    provideFirestore(()=> getFirestore()),
  ]
})
export class UserModule { }
