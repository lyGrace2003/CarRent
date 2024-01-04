import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore,QueryFn  } from "@angular/fire/compat/firestore";
import { Firestore } from "@angular/fire/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { collection } from "firebase/firestore";
import { Observable, switchMap } from "rxjs";
import { Current } from "src/app/model/book";
import { Rental } from "src/app/model/rental";
import { DataService } from "src/app/shared/data.service";
import { collectionData } from 'rxfire/firestore';




@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    
  })

export class HomeComponent implements OnInit {

  currentUserData$: Observable<any> | undefined;
  rental$ =collectionData(collection(this.firestore, 'rentals')) as Observable<Rental[]>;
  filtered: boolean = false; // use this to display filtered and unfiltered data

  //dropdown menu
  form: FormGroup =  this.fb.group({
    lValue: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });

  filter$: Observable<Rental[]> | undefined;

  applyFilters() {
    const { lValue, nValue } = this.form.value;

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
    private data: DataService, 
    private fireauth: AngularFireAuth, 
    private fire: AngularFirestore){}


  //get current user's data once they get to this page
  ngOnInit(){
    this.currentUserData$ = this.fireauth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.fire.collection('users').doc(user.uid).valueChanges();
        } else {
          return [];
        }
      }),
    );
  }

  //store data from rentals  to currBooking

  confirmBooking(rental: any) {
    const isConfirmed = window.confirm("Are you sure you want to rent this car?");
    
    if (isConfirmed) {
      this.bookService(rental);
    } else {
      // User cancelled the booking
      console.log("Booking cancelled");
    }
  }

  private calculateNumDays(startDate: Date, endDate: Date): number {
    // Calculate the difference in milliseconds between the two dates
  const timeDifference = endDate.getTime() - startDate.getTime();

  // Convert the time difference to days
  const numOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return numOfDays;
  }

  bookService(rental: any){
   this.currentUserData$?.subscribe((userData) => {
      if (userData) {
        const numOfDays = this.calculateNumDays(this.form.value.startDate, this.form.value.endDate);
        const booking: Current = {
          userId: userData.userId,
          userName: userData.userName,
          brand: rental.brand,
          model: rental.model,
          location: rental.location,
          startDate: this.form.value.startDate, 
          endDate: this.form.value.endDate, 
          numOfDays:  numOfDays,
          numSeat: rental.numSeat,
          rate: rental.rate * numOfDays,
        };
        this.data.addCurrent(booking).then(()=>{
          alert("Booking Succesful");
        }).catch((error)=>{
          console.log("Booking unsuccesful:", error);
        })
      }
    });
  }

}