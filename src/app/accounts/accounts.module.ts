import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SupplierAccountsComponent } from './supplier-accounts/supplier-accounts.component';
import { AccountsMasterComponent } from './accounts-master/accounts-master.component';
import { OutgoingComponent } from './outgoing/outgoing.component';

@NgModule({
  declarations: [SupplierAccountsComponent, AccountsMasterComponent, OutgoingComponent],
  imports: [CommonModule, AccountsRoutingModule, SharedModule],
})
export class AccountsModule {}
