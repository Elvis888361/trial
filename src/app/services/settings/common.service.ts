import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs';
import { Currency } from 'src/app/interfaces/settings/currency';
import { Depot } from 'src/app/interfaces/settings/depot';
import { Destination } from 'src/app/interfaces/settings/destination';
import { Month } from 'src/app/interfaces/settings/month';
import { Year } from 'src/app/interfaces/settings/year';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private month$: Observable<Month[]>;
  private year$: Observable<Year[]>;
  private depot$: Observable<Depot[]>;
  private destination$: Observable<Destination[]>;
  private currency$: Observable<Currency[]>;
  constructor(private http: HttpClient) {}

  //Depot details
  depotForm: FormGroup = new FormGroup({
    DepotID: new FormControl(0),
    DepotName: new FormControl('', [Validators.required]),
  });

  initializeDepotForm() {
    this.depotForm.setValue({
      DepotID: 0,
      DepotName: '',
    });
  }

  populateDepotForm(record) {
    this.depotForm.setValue({
      DepotID: record.DepotID,
      DepotName: record.DepotName,
    });
  }

  getDepots(): Observable<Depot[]> {
    if (!this.depot$) {
      this.depot$ = this.http
        .get<Depot[]>(environment.getdepots)
        .pipe(shareReplay());
    }
    //if product cache exist return it
    return this.depot$;
  }

  adddepot(data: Depot): Observable<Depot> {
    return this.http.post<Depot>(environment.adddepot, data);
  }

  editdepot(id: number, data: Depot): Observable<Depot> {
    return this.http.put<Depot>(environment.editdepot + id, data);
  }

  clearDepotCache() {
    this.depot$ = null;
  }

  //Currency details
  currencyForm: FormGroup = new FormGroup({
    CurrencyID: new FormControl(0),
    CurrAbbvr: new FormControl('', [Validators.required]),
  });

  initializeCurrencyForm() {
    this.currencyForm.setValue({
      CurrencyID: 0,
      CurrAbbvr: '',
    });
  }

  populateCurrencyForm(record) {
    this.currencyForm.setValue({
      CurrencyID: record.CurrencyID,
      CurrAbbvr: record.CurrAbbvr,
    });
  }

  getCurrencies(): Observable<Currency[]> {
    if (!this.currency$) {
      this.currency$ = this.http
        .get<Currency[]>(environment.getcurrency)
        .pipe(shareReplay());
    }
    //if product cache exist return it
    return this.currency$;
  }

  addcurrency(data: Currency): Observable<Currency> {
    return this.http.post<Currency>(environment.addcurrency, data);
  }

  editcurrency(id: number, data: Currency): Observable<Currency> {
    return this.http.put<Currency>(environment.editcurrency + id, data);
  }

  clearCurrencyCache() {
    this.currency$ = null;
  }

  //months
  getMonths(): Observable<Month[]> {
    if (!this.month$) {
      this.month$ = this.http
        .get<Month[]>(environment.getmonths)
        .pipe(shareReplay());
    }
    //if product cache exist return it
    return this.month$;
  }

  //years
  getYears(): Observable<Year[]> {
    if (!this.year$) {
      this.year$ = this.http
        .get<Year[]>(environment.getyears)
        .pipe(shareReplay());
    }
    //if product cache exist return it
    return this.year$;
  }

  //destinations
  getDestinations(): Observable<Destination[]> {
    if (!this.destination$) {
      this.destination$ = this.http
        .get<Destination[]>(environment.getdestinations)
        .pipe(shareReplay());
    }
    //if product cache exist return it
    return this.destination$;
  }
}
