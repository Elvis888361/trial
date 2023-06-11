import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleClickDirectiveDirective } from './single-click-directive.directive';
import { NumberCommaDirective } from './number-comma.directive';

@NgModule({
  declarations: [SingleClickDirectiveDirective, NumberCommaDirective],
  imports: [CommonModule],
})
export class DirectivesModule {}
