import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepotRoutingModule } from './depot-routing.module';
import { DepotMasterComponent } from './depot-master/depot-master.component';
import { LoadingInstructionsComponent } from './loading-instructions/loading-instructions.component';

@NgModule({
  declarations: [DepotMasterComponent, LoadingInstructionsComponent],
  imports: [CommonModule, DepotRoutingModule],
})
export class DepotModule {}
