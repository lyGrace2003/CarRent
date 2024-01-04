import { Component } from "@angular/core";
import { Firestore, collectionData } from "@angular/fire/firestore";
import { collection } from "firebase/firestore";
import { Observable } from "rxjs";
import { Rental } from "src/app/model/rental";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    
  })

export class HomeComponent{
  rental$ =collectionData(collection(this.firestore, 'rentals')) as Observable<Rental[]>;

  selectedLocation: string = "";
  selectedNumSeats: number | null = null;

  constructor(private readonly firestore: Firestore){}
  
  bookService(){
    
  }

}