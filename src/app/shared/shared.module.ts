import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleClickDirectiveDirective } from '../directives/single-click-directive.directive';
import { NumberCommaDirective } from '../directives/number-comma.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [SingleClickDirectiveDirective, NumberCommaDirective],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DataTablesModule],
  exports: [
    SingleClickDirectiveDirective,
    NumberCommaDirective,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
  ],
})
export class SharedModule {}
