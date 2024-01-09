import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Transactions } from 'src/app/model/transactions';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-trans',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionComponent implements OnInit {

  trans$: Observable<Transactions[]> | undefined;  // Make sure it's initialized as Observable<Transactions[]> | undefined
  dataSource: MatTableDataSource<Transactions> = new MatTableDataSource();  // Initialize MatTableDataSource

  displayedColumns: string[] = ['UserID', 'Username', 'RentalID', 'Days', 'Rate', 'Status'];

  constructor(private readonly firestore: Firestore) {}

  ngOnInit() {
    this.trans$ = collectionData(collection(this.firestore, 'transactions')) as Observable<Transactions[]>;
    this.trans$.subscribe(data => {
      console.log('Firestore Data:', data);
      this.dataSource.data = data;  // Assign the data to MatTableDataSource
    });
  }
}
