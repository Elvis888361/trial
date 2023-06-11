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
import { OrderService } from 'src/app/services/ots/order.service';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OuturnChangesComponent } from './outurn-changes/outurn-changes.component';

@Component({
  selector: 'app-ots-orders',
  templateUrl: './ots-orders.component.html',
  styleUrls: ['./ots-orders.component.css'],
})
export class OtsOrdersComponent implements OnInit, AfterViewInit, OnDestroy {
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  orders$: Observable<any[]>;
  orders: any[] = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(private orderSvc: OrderService, private modalSvc: NgbModal) {}

  ngOnInit(): void {
    this.dtOptions = {
      autoWidth: true,
      responsive: true,
      select: true,
      processing: true,
      ordering: false,
    };
    this.listOrders();
  }

  listOrders() {
    setTimeout(() => {
      this.orders$ = this.orderSvc.getOrders();
      this.orders$.subscribe((result) => {
        this.orders = result;
        this.rerender();
      });
    });
  }

  openDialog(order: any) {
    const modalRef = this.modalSvc.open(OrderDetailsComponent, {
      scrollable: true,
      windowClass: '',
      keyboard: false,
      backdrop: 'static',
      centered: true,
      size: 'lg',
    });

    let data = {
      orderDetails: order,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        if (result == 'success') {
          this.listOrders();
        }
        //this.rerender();
        //console.log(result);
      },
      (reason) => {}
    );
  }

  openOuturnDialog(order: any) {
    const modalRef = this.modalSvc.open(OuturnChangesComponent, {
      scrollable: true,
      windowClass: '',
      keyboard: false,
      backdrop: 'static',
      centered: true,
      size: 'md',
    });

    let data = {
      orderDetails: {
        OtsOrderID: order.OtsOrderID,
        MT: order.MT,
        M3: order.M3,
        MtNew: order.MtNew,
        M3New: order.M3New,
      },
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        if (result == 'success') {
          this.listOrders();
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
