import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs';
import { DischargeItem, OtsTender } from 'src/app/interfaces/ots/ots-tender';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TenderService {
  private tender$: Observable<OtsTender[]>;
  dischargeDetails: DischargeItem[] = [];
  constructor(private http: HttpClient) {}

  tenderForm: FormGroup = new FormGroup({
    OtsTenderID: new FormControl(0),
    DateRange: new FormControl('', [Validators.required]),
    CargoNo: new FormControl('', [Validators.required]),
    SupplierID: new FormControl(0, [Validators.required]),
    ProductID: new FormControl(0, [Validators.required]),
    TenderType: new FormControl('', [Validators.required]),
    TenderMonth: new FormControl(0, [Validators.required]),
    PricingMonth: new FormControl(0, [Validators.required]),
    YearID: new FormControl(0, [Validators.required]),
    Allocation: new FormControl('', [Validators.required]),
    Premium: new FormControl(''),
  });

  initializeTenderForm() {
    this.tenderForm.setValue({
      OtsTenderID: 0,
      DateRange: '',
      CargoNo: '',
      SupplierID: 0,
      ProductID: 0,
      TenderType: '',
      TenderMonth: 0,
      PricingMonth: 0,
      YearID: 0,
      Allocation: '',
      Premium: '',
    });
  }

  populateTenderForm(record) {
    this.tenderForm.setValue({
      OtsTenderID: record.OtsTenderID,
      DateRange: record.DateRange,
      CargoNo: record.CargoNo,
      SupplierID: record.SupplierID,
      ProductID: record.ProductID,
      TenderType: record.TenderType,
      TenderMonth: record.TenderMonth,
      PricingMonth: record.PricingMonth,
      YearID: record.YearID,
      Allocation: record.Allocation,
      Premium: record.Premium,
    });
  }

  dischargeHeaderForm: FormGroup = new FormGroup({
    DateRange: new FormControl('', [Validators.required]),
    Vessel: new FormControl('', [Validators.required]),
    Allocation: new FormControl('', [Validators.required]),
    Actual: new FormControl('', [Validators.required]),
  });

  populateDischargeHeaderForm(record) {
    this.dischargeHeaderForm.setValue({
      DateRange: record.DateRange,
      Vessel: record.Vessel,
      Allocation: record.Allocation,
      Actual: record.Actual,
    });
  }

  dischargeItemForm: FormGroup = new FormGroup({
    DischargeID: new FormControl(0),
    Quantity: new FormControl('', [Validators.required]),
    Status: new FormControl('', [Validators.required]),
    DepotID: new FormControl('', [Validators.required]),
    DestinationID: new FormControl('', [Validators.required]),
    CustomerID: new FormControl('', [Validators.required]),
  });

  initializeDischargeItemForm() {
    this.dischargeItemForm.setValue({
      DischargeID: 0,
      Quantity: '',
      Status: '',
      DepotID: '',
      DestinationID: '',
      CustomerID: '',
    });
  }

  populateDischargeItemForm(record) {
    this.dischargeItemForm.setValue({
      DischargeID: record.DischargeID,
      Quantity: record.Quantity,
      Status: record.Status,
      DepotID: record.DepotID,
      DestinationID: record.DestinationID,
      CustomerID: record.CustomerID,
    });
  }

  getTenders(): Observable<OtsTender[]> {
    if (!this.tender$) {
      this.tender$ = this.http
        .get<OtsTender[]>(environment.gettenders)
        .pipe(shareReplay());
    }
    //if supplier cache exist return it
    return this.tender$;
  }

  addtender(data: OtsTender): Observable<OtsTender> {
    return this.http.post<OtsTender>(environment.addtender, data);
  }

  edittender(id: number, data: OtsTender): Observable<OtsTender> {
    return this.http.put<OtsTender>(environment.edittender + id, data);
  }

  deletetender(id: number): Observable<OtsTender> {
    return this.http.delete<OtsTender>(environment.deltender + id);
  }

  getTenderDischargeInstructions(id: number): any {
    return this.http.get(environment.gettenderdischargedetails + id);
  }

  postDischargeInstructions(id: number, data: any): any {
    return this.http.put(environment.postdischargeinstructions + id, data);
  }

  clearTenderCache() {
    this.tender$ = null;
  }
}
