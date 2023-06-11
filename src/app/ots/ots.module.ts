import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtsRoutingModule } from './ots-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { OtsOrdersComponent } from './ots-orders/ots-orders.component';
import { TenderListComponent } from './tender-list/tender-list.component';
import { DischargeListComponent } from './discharge-list/discharge-list.component';
import { DischargeDetailsComponent } from './discharge-list/discharge-details/discharge-details.component';
import { OrderDetailsComponent } from './ots-orders/order-details/order-details.component';
import { DischargeItemComponent } from './discharge-list/discharge-item/discharge-item.component';
import { TenderDetailsComponent } from './tender-list/tender-details/tender-details.component';
import { SharedModule } from '../shared/shared.module';
import { DischargeHistoryListComponent } from './discharge-history-list/discharge-history-list.component';
import { OtsInvoiceDetailsComponent } from './ots-orders/ots-invoice-details/ots-invoice-details.component';
import { OuturnChangesComponent } from './ots-orders/outurn-changes/outurn-changes.component';
import { ReceiveStockComponent } from './ots-orders/receive-stock/receive-stock.component';
import { OrderAseListComponent } from './ots-orders/order-ase-list/order-ase-list.component';

@NgModule({
  declarations: [
    OtsOrdersComponent,
    TenderListComponent,
    DischargeListComponent,
    DischargeDetailsComponent,
    OrderDetailsComponent,
    DischargeItemComponent,
    TenderDetailsComponent,
    DischargeHistoryListComponent,
    OtsInvoiceDetailsComponent,
    OuturnChangesComponent,
    ReceiveStockComponent,
    OrderAseListComponent,
  ],
  imports: [CommonModule, OtsRoutingModule, PrimengModule, SharedModule],
})
export class OtsModule {}
