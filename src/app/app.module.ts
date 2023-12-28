import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { environment } from 'src/environments/environment.development';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    provideFirebaseApp(()=>initializeApp(environment.firebase)),
    provideFirestore(()=> getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
