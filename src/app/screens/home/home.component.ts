import { Component, OnInit, inject } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore,QueryFn  } from "@angular/fire/compat/firestore";
import { Firestore } from "@angular/fire/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Observable, catchError, map, of, switchMap, take, tap } from "rxjs";
import { Current } from "src/app/model/book";
import { Rental } from "src/app/model/rental";
import { collectionData } from 'rxfire/firestore';




@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    
  })

export class HomeComponent implements OnInit {

  currentUserData$: Observable<any> | undefined;
  rental$ =collectionData(collection(this.firestore, 'rentals')) as Observable<Rental[]>;
  filtered: boolean = false; 

  //dropdown menu
  form: FormGroup =  this.fb.group({
    lValue: ['', Validators.required],
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
  });

  filter$: Observable<Rental[]> | undefined;

  applyFilters() {
    const { lValue } = this.form.value;

    let queryFn: QueryFn | undefined;

    if (lValue) {
      queryFn = (ref: any) => ref.where('location', '==', lValue);
    }

    const collectionRef = this.fire.collection<Rental>('rentals').ref;

    if (queryFn) {
      const query = queryFn(collectionRef);
      this.filter$ = collectionData<Rental>(query as any); // as any to avoid type error
    }
  }
  

  Save(){
    this.filtered = true;
    this.applyFilters();
  }

  constructor(
    private fb: FormBuilder,
    private readonly firestore: Firestore, 
    private fireauth: AngularFireAuth, 
    private fire: AngularFirestore){}

    store: Firestore = inject(Firestore);
  //get current user's data once they get to this page
  ngOnInit() {
    this.currentUserData$ = this.fireauth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.fire.collection('users').doc(user.uid).valueChanges().pipe(
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
    });
  }
  confirmBooking(rental: any) {
    const isConfirmed = window.confirm("Are you sure you want to rent this car?");
    
    if (isConfirmed) {
      this.bookService(rental);
    } else {
      console.log("Booking cancelled");
    }
  }

  async addCurrent(userData: any, rental: any): Promise<any> {
    const acollection = collection(this.store, 'currBooking');
    const acollectiontwo = collection(this.store, 'transactions');
    // Check if userData is defined and has userId
    if (!userData || !userData.hasOwnProperty('userId')) {
        console.error('Invalid user data or userId is undefined.');
        alert('Invalid user data or userId is undefined.');
        return;
    }

    const startDate = this.form.get('startDate')?.value;
    const endDate = this.form.get('endDate')?.value;

    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
        console.error('Invalid Date');
        alert('Invalid Date');
        return;
    }

    const numOfDays = this.calculateNumDays(startDate, endDate);

    try {
      const newDocRef = await addDoc(acollection, {
          'bookingId': '',
          'userId': userData.userId,
          'userName': userData.name,
          'brand': rental.brand,
          'model': rental.model,
          'location': rental.location,
          'startDate': startDate,
          'endDate': endDate,
          'numOfDays': numOfDays,
          'numSeat': rental.numSeat,
          'rate': rental.rate * numOfDays,
          'transactionID': ''
      });
      const newBookingId = newDocRef.id;
      await updateDoc(doc(acollection, newBookingId), {
        'bookingId': newBookingId
    });
      const docu = await addDoc(acollectiontwo, {
        'userID': userData.userId,
        'userName': userData.name,
        'rentalID': newBookingId,
        'numOfDays': numOfDays,
        'status': 'in-progress'
    });
      const newtransID = docu.id;

      await updateDoc(doc(acollection, newBookingId), {
        'transactionID': newtransID
    });
  
      alert('Booking successful');
  } catch (error) {
      console.error('Booking unsuccessful:', error);
      alert('Booking unsuccessful');
  }
  
}

  

  private calculateNumDays(startDate: Date, endDate: Date): number {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      alert("Invalid Date")
    }
    // Calculate the difference in milliseconds between the two dates
    const timeDifference = endDate.getTime() - startDate.getTime();
    // Convert the time difference to days
    const numOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return numOfDays;
  }
  

  bookService(rental: any) {
    this.currentUserData$?.subscribe({
      next: (userData) => {
        if (userData) {
          this.addCurrent(userData, rental);
        }
      },error: (error) => {
        console.error("Error getting user data:", error);
      }
    });
  }
}