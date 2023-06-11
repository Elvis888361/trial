import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/settings/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  @Input() fromParent;
  customer: any;

  customers$!: Observable<Customer[]>;
  customers: Customer[] = [];

  constructor(
    public cusSvc: CustomerService,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.customer = this.fromParent.customerDetails;
    console.log(this.customer);
    if (this.customer == null) {
      this.cusSvc.initializeCustomerForm();
    } else {
      this.cusSvc.populateCustomerForm(this.customer);
    }
  }

  onSubmit() {
    let data = this.cusSvc.customerForm.value;

    if (data.CustomerID == 0) {
      this.cusSvc.addcustomer(data).subscribe({
        next: (res) => {
          if (res['Message'] == 'Duplicate Record') {
            this.toastr.error(':: ' + res['responseObject']['Data']);
          }
          if (res['Message'] == 'Success') {
            this.cusSvc.clearCustomerCache();
            this.customers$ = this.cusSvc.getCustomers();
            this.customers$.subscribe((newList) => {
              this.customers = newList;
              this.toastr.success(
                ':: A new customer has been added successfully.'
              );
              this.closeModal('success');
            });
          }
        },
      });
    } else {
      let customerId: number;
      customerId = this.cusSvc.customerForm.get('CustomerID').value;
      this.cusSvc.editcustomer(customerId, data).subscribe({
        next: (res) => {
          if (res['Message'] == 'Duplicate Record') {
            this.toastr.warning(
              ':: Another record exist with the same details'
            );
          } else {
            this.cusSvc.clearCustomerCache();
            this.customers$ = this.cusSvc.getCustomers();
            this.customers$.subscribe((newList) => {
              this.customers = newList;
              this.toastr.info(':: Customer details updated successfully');
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
