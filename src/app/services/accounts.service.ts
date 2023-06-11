import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private unpaid$: Observable<any[]>;
  constructor(private http: HttpClient) {}

  outgoingForm: FormGroup = new FormGroup({
    TransactionID: new FormControl('0'),
    TransactionDate: new FormControl('', [Validators.required]),
    SupplierID: new FormControl(0, [Validators.required]),
    CurrencyID: new FormControl(0, [Validators.required]),
    Amount: new FormControl('', [Validators.required]),
  });

  initializeOutgoingForm() {
    this.outgoingForm.setValue({
      TransactionID: 0,
      TransactionDate: '',
      SupplierID: 0,
      CurrencyID: 0,
      Amount: '',
    });
  }

  getunpaidorders(): Observable<any[]> {
    if (!this.unpaid$) {
      this.unpaid$ = this.http
        .get<any[]>(environment.getunpaidorders)
        .pipe(shareReplay());
    }

    //if supplier cache exist return it.
    return this.unpaid$;
  }
}
