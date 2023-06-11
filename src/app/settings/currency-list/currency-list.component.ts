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
import { Currency } from 'src/app/interfaces/settings/currency';
import { CommonService } from 'src/app/services/settings/common.service';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css'],
})
export class CurrencyListComponent implements OnInit, AfterViewInit, OnDestroy {
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  currencies$: Observable<Currency[]>;
  currencies: Currency[] = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(private commSvc: CommonService, private modalSvc: NgbModal) {}

  ngOnInit(): void {
    this.dtOptions = {
      autoWidth: true,
      responsive: true,
      select: true,
      processing: true,
    };
    this.listCurrency();
  }

  listCurrency() {
    setTimeout(() => {
      this.currencies$ = this.commSvc.getCurrencies();
      this.currencies$.subscribe((result) => {
        this.currencies = result as Currency[];
        this.rerender();
      });
    });
  }

  openDialog(curr: any) {
    const modalRef = this.modalSvc.open(CurrencyDetailsComponent, {
      scrollable: true,
      windowClass: '',
      keyboard: false,
      backdrop: 'static',
      centered: true,
      size: 'sm',
    });

    let data = {
      currencyDetails: curr,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        if (result == 'success') {
          this.listCurrency();
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
