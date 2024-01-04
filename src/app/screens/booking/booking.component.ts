import { Component } from "@angular/core";
import { collectionData } from "@angular/fire/firestore";
import { Firestore, collection } from "firebase/firestore";
import { Observable } from "rxjs";
import { Current, Previous } from "src/app/model/book";

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.css'],
    
  })

export class BookingComponent{

  // curr$ = collectionData(collection(this.firestore, 'rentals')) as Observable<Current[]>;
  // prev$ = collectionData(collection(this.firestore, 'rentals')) as Observable<Previous[]>;

  // constructor(private readonly firestore: Firestore){}

}