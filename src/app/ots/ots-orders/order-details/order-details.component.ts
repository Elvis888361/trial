import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { OrderService } from 'src/app/services/ots/order.service';
import { OtsInvoiceDetailsComponent } from '../ots-invoice-details/ots-invoice-details.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() fromParent;
  order: any;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  orders$: Observable<any[]>;
  orders: any[] = [];

  OtsOrderID: number = 0;

  @ViewChild(DataTableDirective, { static: true })
  dtElement: DataTableDirective;

  constructor(
    public orderSvc: OrderService,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private modalSvc: NgbModal
  ) {}

  ngOnInit(): void {
    this.order = this.fromParent.orderDetails;
    this.OtsOrderID = this.order.OtsOrderID;
    this.orderSvc.populateForm(this.order);
    this.listInvoiveDetails(this.OtsOrderID);
    this.dtOptions = {
      autoWidth: true,
      responsive: true,
      searching: false,
      bLengthChange: false,
      select: true,
      ordering: false,
    };
  }

  listInvoiveDetails(id: number) {
    this.orderSvc.getOrderInvoices(id).subscribe((res) => {
      this.orderSvc.orderInvoiceDetails = res;
      this.rerender();
    });
  }

  addInvoiceItem(ItemIndex: any, OtsOrderID: number) {
    const modalRef = this.modalSvc.open(OtsInvoiceDetailsComponent, {
      scrollable: true,
      windowClass: '',
      keyboard: false,
      backdrop: 'static',
      centered: true,
      size: 'md',
    });

    let data = {
      ItemIndex: ItemIndex,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        this.rerender();
        //console.log(result);
      },
      (reason) => {}
    );
  }

  onSubmit() {
    //
    let data = {
      M3: this.orderSvc.orderHeaderForm.get('M3').value,
      SupplierID: this.order.SupplierID,
      Details: this.orderSvc.orderInvoiceDetails,
    };

    this.orderSvc.clearCache();
    this.orderSvc.postOrderInvoices(this.OtsOrderID, data).subscribe((res) => {
      if (res['Message'] == 'Success') {
        this.toastr.success(':: Invoices updated succesfully');
        this.closeModal('success');
      } else {
        this.toastr.error(':: Your request failed. Check and try again');
      }
    });
  }

  deleteInvoice(invoiceId: number) {}

  onKeyUp(x) {
    console.log(x.target.value);
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

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
