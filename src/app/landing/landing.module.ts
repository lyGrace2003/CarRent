import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { NavComponent } from '../navbar/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment.development';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { StartComponent } from '../screens/start/start.component';


@NgModule({
  declarations: [
    LandingComponent, 
    StartComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    provideFirebaseApp(()=>initializeApp(environment.firebase)),
    provideFirestore(()=> getFirestore()),
  ]
})
export class LandingModule { }
