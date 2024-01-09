import { Component, OnInit } from "@angular/core";
import { AngularFirestore, DocumentReference } from "@angular/fire/compat/firestore";
import { Firestore } from "@angular/fire/firestore";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})

export class BookingComponent implements OnInit {
  currBookingData: any[] | undefined;
  prevBookingData: any[] | undefined;

  constructor(private firestore: AngularFirestore, private store: Firestore) {}

  ngOnInit(): void {
    this.firestore.collection('currBooking').valueChanges().subscribe((data) => {
      this.currBookingData = data;
    });

    this.firestore.collection('prevBooking').valueChanges().subscribe((data) => {
      this.prevBookingData = data;
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
        });

        // Assuming you have a 'bookingId' property in curbooking
        const currBookingDocRef = doc(this.store, 'currBooking', curbooking.bookingId);

        // Delete the current booking document from 'currBooking'
        await deleteDoc(currBookingDocRef);

        console.log('Document deleted from currBooking');
        alert('Booking Complete');
    } catch (error) {
        console.error('Booking cannot not be completed', error);
        alert('Booking cannot not be completed');
    }
}

}
