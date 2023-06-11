import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import {
  Supplier,
  SupplierAccount,
} from 'src/app/interfaces/settings/supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private supplier$: Observable<Supplier[]>;
  private supplierAcc$: Observable<SupplierAccount[]>;
  constructor(private http: HttpClient) {}

  supplierForm: FormGroup = new FormGroup({
    SupplierID: new FormControl(0),
    SupplierName: new FormControl('', [Validators.required]),
    IsActive: new FormControl(true),
  });

  initializeSupplierForm() {
    this.supplierForm.setValue({
      SupplierID: 0,
      SupplierName: '',
      IsActive: true,
    });
  }

  populateSupplierForm(record) {
    this.supplierForm.setValue({
      SupplierID: record.SupplierID,
      SupplierName: record.SupplierName,
      IsActive: record.IsActive,
    });
  }

  getSuppliers(): Observable<Supplier[]> {
    if (!this.supplier$) {
      this.supplier$ = this.http
        .get<Supplier[]>(environment.getsuppliers)
        .pipe(shareReplay());
    }
    //if supplier cache exist return it
    return this.supplier$;
  }

  addsupplier(data: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(environment.addsupplier, data);
  }

  editsupplier(id: number, data: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(environment.editsupplier + id, data);
  }

  getSupplierAccount(): Observable<SupplierAccount[]> {
    if (!this.supplierAcc$) {
      this.supplierAcc$ = this.http
        .get<SupplierAccount[]>(environment.supplieraccounts)
        .pipe(shareReplay());
    }
    //if supplier cache exist return it
    return this.supplierAcc$;
  }

  clearSupplierCache() {
    this.supplier$ = null;
  }
}
