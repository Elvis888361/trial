import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierAccountsComponent } from './supplier-accounts/supplier-accounts.component';
import { OutgoingComponent } from './outgoing/outgoing.component';

const routes: Routes = [
  { path: 'suppliers', component: SupplierAccountsComponent },
  { path: 'outgoing', component: OutgoingComponent },

  // {
  //   path: '',
  //   component: AccountsMasterComponent,
  //   children: [
  //     { path: 'suppliers', component: SupplierAccountsComponent },
  //     { path: 'usd', component: SupplierAccountsComponent },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
