import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { OrderInvoice } from 'src/app/interfaces/ots/order';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private order$: Observable<any[]>;
  constructor(private http: HttpClient) {}
  orderInvoiceDetails: OrderInvoice[] = [];

  orderHeaderForm: FormGroup = new FormGroup({
    CargoNo: new FormControl(''),
    Vessel: new FormControl(''),
    SupplierName: new FormControl(''),
    Mode: new FormControl(''),
    M3: new FormControl('', [Validators.required]),
  });

  populateForm(record: any) {
    this.orderHeaderForm.setValue({
      CargoNo: record.CargoNo,
      Vessel: record.Vessel,
      SupplierName: record.SupplierName,
      Mode: record.Mode,
      M3: record.M3,
    });
  }

  invoiceForm: FormGroup = new FormGroup({
    InvoiceID: new FormControl(0),
    InvoiceDate: new FormControl('', [Validators.required]),
    InvoiceNo: new FormControl('', [Validators.required]),
    CurrencyID: new FormControl('', [Validators.required]),
    Amount: new FormControl('', [Validators.required]),
  });

  initializeInvoiceForm() {
    this.invoiceForm.setValue({
      InvoiceID: 0,
      InvoiceDate: '',
      InvoiceNo: '',
      CurrencyID: '',
      Amount: '',
    });
  }

  populateInvoiceForm(record) {
    var date = new Date(record.InvoiceDate);
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    const formattedDate = formatDate(date, format, locale);
    this.invoiceForm.setValue({
      InvoiceID: record.InvoiceID,
      InvoiceDate: formattedDate,
      InvoiceNo: record.InvoiceNo,
      CurrencyID: record.CurrencyID,
      Amount: record.Amount,
    });
  }

  outurnForm: FormGroup = new FormGroup({
    MT: new FormControl(''),
    M3: new FormControl(''),
    MtNew: new FormControl('', [Validators.required]),
    M3New: new FormControl('', [Validators.required]),
  });

  populateOuturnForm(record) {
    this.outurnForm.setValue({
      MT: record.MT,
      M3: record.M3,
      MtNew: record.MtNew,
      M3New: record.M3New,
    });
  }

  // aseHeaderForm: FormGroup = new FormGroup({
  //   CargoNo: new FormControl('', [Validators.required]),
  //   Vessel: new FormControl('', [Validators.required]),
  //   Supplier: new FormControl('', [Validators.required]),
  //   Product: new FormControl('', [Validators.required]),
  //   Mode: new FormControl('', [Validators.required]),
  //   Depot: new FormControl('', [Validators.required]),
  //   MT: new FormControl('', [Validators.required]),
  //   M3: new FormControl('', [Validators.required]),
  // });

  // populateAseHeaderForm(record) {
  //   this.aseHeaderForm.setValue({
  //     CargoNo: record.CargoNo,
  //     Vessel: record.Vessel,
  //     Supplier: record.Supplier,
  //     Product: record.Product,
  //     Mode: record.Mode,
  //     Depot: record.Depot,
  //     MT: record.MT,
  //     M3: record.M3,
  //   });
  // }

  getOrders(): Observable<any[]> {
    if (!this.order$) {
      this.order$ = this.http
        .get<any[]>(environment.getotsorders)
        .pipe(shareReplay());
    }
    //if cache exist return it
    return this.order$;
  }

  editorder(id: number, data: any): Observable<any> {
    return this.http.put<any>(environment.editotsorder + id, data);
  }

  getOrderInvoices(id: number): any {
    return this.http.get(environment.getorderinvoices + id);
  }

  postOrderInvoices(id: number, data: any): any {
    return this.http.put(environment.updateorderinvoices + id, data);
  }

  updateOuturn(id: number, data: any): any {
    return this.http.put(environment.updateouturn + id, data);
  }

  clearCache() {
    this.order$ = null;
  }
}
