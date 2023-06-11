import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { DepotListComponent } from './depot-list/depot-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';

const routes: Routes = [
  { path: 'suppliers', component: SupplierListComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'depots', component: DepotListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'currencies', component: CurrencyListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
