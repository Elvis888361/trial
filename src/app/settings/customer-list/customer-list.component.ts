import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/settings/customer.service';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit, AfterViewInit, OnDestroy {
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  customers$: Observable<Customer[]>;
  customers: Customer[] = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(private cusSvc: CustomerService, private modalSvc: NgbModal) {}

  ngOnInit(): void {
    this.dtOptions = {
      autoWidth: true,
      responsive: true,
      select: true,
      processing: true,
    };
    this.listCustomers();
  }

  listCustomers() {
    setTimeout(() => {
      this.customers$ = this.cusSvc.getCustomers();
      this.customers$.subscribe((result) => {
        this.customers = result as Customer[];
        this.rerender();
      });
    });
  }

  openDialog(cus: any) {
    const modalRef = this.modalSvc.open(CustomerDetailsComponent, {
      scrollable: true,
      windowClass: '',
      keyboard: false,
      backdrop: 'static',
      centered: true,
      size: 'md',
    });

    let data = {
      customerDetails: cus,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        if (result == 'success') {
          this.listCustomers();
        }
        //this.rerender();
        //console.log(result);
      },
      (reason) => {}
    );
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }
}
