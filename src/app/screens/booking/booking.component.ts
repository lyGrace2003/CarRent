import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, DocumentReference } from "@angular/fire/compat/firestore";
import { Firestore } from "@angular/fire/firestore";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Observable, catchError, map, of, switchMap } from "rxjs";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})

export class BookingComponent implements OnInit {
  currBookingData: any[] | undefined;
  prevBookingData: any[] | undefined;
  currentUserData$: Observable<any> | undefined;

  constructor(private firestore: AngularFirestore, private store: Firestore,private fireauth: AngularFireAuth) {}

  ngOnInit(): void {
    this.currentUserData$ = this.fireauth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).valueChanges().pipe(
            map((userData: any) => {
              return {
                ...userData,
                userId: user.uid,
                userName: userData?.userName || 'DefaultUserName', 
              };
            })
          );
        } else {
          return of(null);
        }
      }),
      catchError((error) => {
        alert(error.message);
        return of(null);
      })
    )
    
    this.currentUserData$.subscribe((userData) => {
      console.log('User Data:', userData);
      if (userData) {
        this.firestore
          .collection('currBooking', (ref) => ref.where('userID', '==', userData.userId))
          .valueChanges()
          .subscribe((data) => {
            this.currBookingData = data;
          });
  
        this.firestore
          .collection('prevBooking', (ref) => ref.where('userID', '==', userData.userId))
          .valueChanges()
          .subscribe((data) => {
            this.prevBookingData = data;
          });
      }
    });
  }

  formatTimestamp(timestamp: { seconds?: number, nanoseconds?: number }): Date | null {
    if (timestamp && timestamp.seconds !== undefined) {
      return new Date(timestamp.seconds * 1000);
    } else {
      return null;
    }
  }

  async complete(curbooking: any) {
    const acollection = collection(this.store, 'prevBooking');
    const acollectiontwo = collection(this.store, 'transactions');

    try {
        // Add the current booking to the 'prevBooking' collection
         await addDoc(acollection, {
            'userId': curbooking.userId,
            'userName': curbooking.userName,
            'brand': curbooking.brand,
            'model': curbooking.model,
            'location': curbooking.location,
            'startDate': curbooking.startDate,
            'endDate': curbooking.endDate,
            'numOfDays': curbooking.numOfDays,
            'numSeat': curbooking.numSeat,
            'rate': curbooking.rate,
            'transactionID': curbooking.transactionID,
        });

        const currBookingDocRef = doc(this.store, 'currBooking', curbooking.bookingId);
        const transactionDocRef = doc(acollectiontwo, curbooking.transactionID);
        // Delete the current booking document from 'currBooking'
        await deleteDoc(currBookingDocRef);
        await updateDoc(transactionDocRef, {
          'status': 'complete'
      });

        console.log('Document deleted from currBooking');
        alert('Booking Complete');
    } catch (error) {
        console.error('Booking cannot not be completed', error);
        alert('Booking cannot not be completed');
    }
}

}
