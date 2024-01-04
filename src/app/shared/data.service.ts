import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Current } from '../model/book';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private fireauth: AngularFireAuth ,private fire: AngularFirestore ) {}
  firestore: Firestore = inject(Firestore);

  async addCurrent(bookingData: Current): Promise<any> {
    const acollection = collection(this.firestore, 'currBooking');

    await addDoc(acollection, bookingData).then(() => {
      console.log("Booking successful");
   }).catch((error) => {
      console.error("Booking unsuccessful:", error);
   });
  }

}
