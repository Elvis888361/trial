import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { Currency } from 'src/app/interfaces/settings/currency';
import { OrderService } from 'src/app/services/ots/order.service';
import { CommonService } from 'src/app/services/settings/common.service';

@Component({
  selector: 'app-ots-invoice-details',
  templateUrl: './ots-invoice-details.component.html',
  styleUrls: ['./ots-invoice-details.component.css'],
})
export class OtsInvoiceDetailsComponent implements OnInit {
  @Input() fromParent;
  currencies$!: Observable<Currency[]>;
  currencies: Currency[] = [];

  selectedCurr = null;

  constructor(
    public orderSvc: OrderService,
    private activeModal: NgbActiveModal,
    private commSvc: CommonService
  ) {}

  ngOnInit(): void {
    this.listCurrencies();
    if (this.fromParent.ItemIndex == null) {
      this.orderSvc.initializeInvoiceForm();
    } else {
      this.orderSvc.populateInvoiceForm(
        this.orderSvc.orderInvoiceDetails[this.fromParent.ItemIndex]
      );
    }
  }

  listCurrencies() {
    this.currencies$ = this.commSvc.getCurrencies();
    this.currencies$.subscribe((res) => {
      this.currencies = res;
    });
  }

  currencyChange(event) {
    const result = this.currencies
      .filter((item) => item.CurrencyID == event.target.value)
      .find((item) => item.CurrencyID == event.target.value);

    this.selectedCurr = result.CurrAbbvr;
  }

  onSubmit() {
    let data = this.orderSvc.invoiceForm.value;

    data.CurrAbbvr =
      this.selectedCurr == null
        ? this.orderSvc.orderInvoiceDetails[this.fromParent.ItemIndex][
            'CurrAbbvr'
          ]
        : this.selectedCurr;

    if (this.fromParent.ItemIndex == null) {
      this.orderSvc.orderInvoiceDetails.push(data);
    } else {
      this.orderSvc.orderInvoiceDetails[this.fromParent.ItemIndex] = data;
    }

    this.closeModal('close');
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
