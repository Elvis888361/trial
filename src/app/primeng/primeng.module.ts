import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [],
  imports: [CommonModule, ButtonModule, TableModule, MultiSelectModule],
  exports: [ButtonModule, TableModule, MultiSelectModule],
})
export class PrimengModule {}
