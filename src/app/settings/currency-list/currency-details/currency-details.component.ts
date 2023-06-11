import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Currency } from 'src/app/interfaces/settings/currency';
import { CommonService } from 'src/app/services/settings/common.service';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.css'],
})
export class CurrencyDetailsComponent implements OnInit {
  currency: any;
  @Input() fromParent;

  currencies$!: Observable<Currency[]>;
  currencies: Currency[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    public commSvc: CommonService
  ) {}

  ngOnInit(): void {
    this.currency = this.fromParent.currencyDetails;
    if (this.currency == null) {
      this.commSvc.initializeCurrencyForm();
    } else {
      this.commSvc.populateCurrencyForm(this.currency);
    }
  }

  onSubmit() {
    let data = this.commSvc.currencyForm.value;
    if (data.CurrencyID == 0) {
      this.commSvc.addcurrency(data).subscribe({
        next: (res) => {
          if (res['Message'] == 'Duplicate Record') {
            this.toastr.error(':: ' + res['responseObject']['Data']);
          }
          if (res['Message'] == 'Success') {
            this.commSvc.clearCurrencyCache();
            this.currencies$ = this.commSvc.getCurrencies();
            this.currencies$.subscribe((newList) => {
              this.currencies = newList;
              this.toastr.success(
                ':: A new currency has been added successfully.'
              );
              this.closeModal('success');
            });
          }
        },
      });
    } else {
      let currencyId: number;
      currencyId = this.commSvc.currencyForm.get('CurrencyID').value;
      this.commSvc.editcurrency(currencyId, data).subscribe({
        next: (res) => {
          if (res['Message'] == 'Duplicate Record') {
            this.toastr.warning(
              ':: Another record exist with the same details'
            );
          } else {
            this.commSvc.clearCurrencyCache();
            this.currencies$ = this.commSvc.getCurrencies();
            this.currencies$.subscribe((newList) => {
              this.currencies = newList;
              this.toastr.info(':: Currency details updated successfully');
              this.closeModal('success');
            });
          }
        },
      });
    }
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
