import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenderListComponent } from './tender-list/tender-list.component';
import { DischargeListComponent } from './discharge-list/discharge-list.component';
import { OtsOrdersComponent } from './ots-orders/ots-orders.component';
import { DischargeHistoryListComponent } from './discharge-history-list/discharge-history-list.component';
import { ReceiveStockComponent } from './ots-orders/receive-stock/receive-stock.component';

const routes: Routes = [
  { path: 'tenders', component: TenderListComponent },
  { path: 'discharge-instructions', component: DischargeListComponent },
  {
    path: 'discharge-instructions-history',
    component: DischargeHistoryListComponent,
  },
  { path: 'orders', component: OtsOrdersComponent },
  { path: 'receive-stock', component: ReceiveStockComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtsRoutingModule {}
