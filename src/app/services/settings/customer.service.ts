import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Customer } from 'src/app/interfaces/settings/customer';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customer$: Observable<Customer[]>;
  constructor(private http: HttpClient) {}

  customerForm: FormGroup = new FormGroup({
    CustomerID: new FormControl(0),
    CustomerName: new FormControl('', [Validators.required]),
    IsActive: new FormControl(true),
  });

  initializeCustomerForm() {
    this.customerForm.setValue({
      CustomerID: 0,
      CustomerName: '',
      IsActive: true,
    });
  }

  populateCustomerForm(record) {
    this.customerForm.setValue({
      CustomerID: record.CustomerID,
      CustomerName: record.CustomerName,
      IsActive: record.IsActive,
    });
  }

  getCustomers(): Observable<Customer[]> {
    if (!this.customer$) {
      this.customer$ = this.http
        .get<Customer[]>(environment.getcustomers)
        .pipe(shareReplay());
    }
    //if product cache exist return it
    return this.customer$;
  }

  getCurrency(): Observable<Customer[]> {
    if (!this.customer$) {
      this.customer$ = this.http
        .get<Customer[]>(environment.getcustomers)
        .pipe(shareReplay());
    }
    //if product cache exist return it
    return this.customer$;
  }

  addcustomer(data: Customer): Observable<Customer> {
    return this.http.post<Customer>(environment.addcustomer, data);
  }

  editcustomer(id: number, data: Customer): Observable<Customer> {
    return this.http.put<Customer>(environment.editcustomer + id, data);
  }

  clearCustomerCache() {
    this.customer$ = null;
  }
}
