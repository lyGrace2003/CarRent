import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Transactions } from 'src/app/model/transactions';

@Component({
  selector: 'app-trans',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionComponent implements OnInit {
  transactions$: Observable<Transactions[]> | null = null;

  constructor(private firestore: AngularFirestore) {}
  displayedColumns: string[] = ['userID', 'userName', 'rentalID', 'numOfDays', 'rate', 'status'];

  ngOnInit(): void {
    const transactionsCollection: AngularFirestoreCollection<Transactions> = this.firestore.collection('transactions');
    this.transactions$ = transactionsCollection.valueChanges();
  }
}
