import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsRoutingModule } from './sms-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MessagesComponent],
  imports: [CommonModule, SmsRoutingModule, NgSelectModule, SharedModule],
})
export class SmsModule {}
