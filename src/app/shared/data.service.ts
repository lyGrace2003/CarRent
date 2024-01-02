import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { User } from '../model/user';
import {AngularFireAuth} from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private fireauth: AngularFireAuth ,private afs: AngularFirestore ) {}

  
}
