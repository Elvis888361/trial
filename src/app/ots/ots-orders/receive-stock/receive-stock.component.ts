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
import { map } from 'rxjs/operators';
import { OrderService } from 'src/app/services/ots/order.service';
import { OrderAseListComponent } from '../order-ase-list/order-ase-list.component';

@Component({
  selector: 'app-receive-stock',
  templateUrl: './receive-stock.component.html',
  styleUrls: ['./receive-stock.component.css'],
})
export class ReceiveStockComponent implements OnInit, AfterViewInit, OnDestroy {
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
      this.orders$ = this.orderSvc
        .getOrders()
        .pipe(
          map((items) =>
            items.filter(
              (item) =>
                item.ReceiveStatus == 'Pending' && item.OutturnStatus == 1
            )
          )
        );
      this.orders$.subscribe((result) => {
        this.orders = result;
        this.rerender();
      });
    });
  }

  openDialog(order: any) {
    const modalRef = this.modalSvc.open(OrderAseListComponent, {
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
