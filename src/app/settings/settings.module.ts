import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { DepotListComponent } from './depot-list/depot-list.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { SupplierDetailsComponent } from './supplier-list/supplier-details/supplier-details.component';
import { CurrencyDetailsComponent } from './currency-list/currency-details/currency-details.component';
import { ProductDetailsComponent } from './product-list/product-details/product-details.component';
import { DepotDetailsComponent } from './depot-list/depot-details/depot-details.component';
import { CustomerDetailsComponent } from './customer-list/customer-details/customer-details.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SupplierListComponent,
    CustomerListComponent,
    ProductListComponent,
    DepotListComponent,
    CurrencyListComponent,
    CustomerDetailsComponent,
    DepotDetailsComponent,
    ProductDetailsComponent,
    CurrencyDetailsComponent,
    SupplierDetailsComponent,
  ],
  imports: [CommonModule, SettingsRoutingModule, SharedModule],
})
export class SettingsModule {}
