import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { User } from '../model/user';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Current } from '../model/book';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private fireauth: AngularFireAuth ,private firestore: AngularFirestore ) {}

  addCurrent(bookingData: Current): Promise<any> {
    return this.firestore.collection('currBooking').add(bookingData);
  }

}
