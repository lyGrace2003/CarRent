import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddComponent } from '../screens/add/add.component';
import { TransactionComponent } from '../screens/transactions/transactions.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'rentals', pathMatch: 'full' },
      { path: 'rentals', component: AddComponent },
      { path: 'transactions', component: TransactionComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
