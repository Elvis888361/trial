import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Currency } from 'src/app/interfaces/settings/currency';
import { Supplier } from 'src/app/interfaces/settings/supplier';
import { AccountsService } from 'src/app/services/accounts.service';
import { CommonService } from 'src/app/services/settings/common.service';
import { SupplierService } from 'src/app/services/settings/supplier.service';

@Component({
  selector: 'app-outgoing',
  templateUrl: './outgoing.component.html',
  styleUrls: ['./outgoing.component.css'],
})
export class OutgoingComponent implements OnInit {
  currencies$: Observable<Currency[]>;
  currencies: Currency[] = [];

  suppliers$: Observable<Supplier[]>;
  suppliers: Supplier[] = [];

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  invoices$: Observable<any[]>;
  invoices: any[] = [];

  selectedCurrency: number;
  selectedSupplier: number;

  message = '';

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(
    private suppSvc: SupplierService,
    private commSvc: CommonService,
    public accSvc: AccountsService,
    private toastr: ToastrService
  ) {}

  someClickHandler(info: any): void {
    this.message = info;
  }

  ngOnInit(): void {
    this.dtOptions = {
      autoWidth: true,
      responsive: true,
      columnDefs: [
        {
          orderable: false,
          target: 0,
        },
        {
          target: 5,
          visible: false,
        },
      ],
      select: {
        style: 'multi',
        selector: 'td:first-child',
      },
      processing: true,
      targets: 'no-sort',
      bSort: false,
      rowCallback: (row: Node, invoices: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are
        // deprecated in favor of `off` and `on`
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.someClickHandler(invoices);
        });
        return row;
      },
    };
    this.listSuppliers();
    this.listCurrencies();
  }

  listSuppliers() {
    this.suppliers$ = this.suppSvc.getSuppliers();
    this.suppliers$.subscribe((res) => {
      this.suppliers = res;
    });
  }

  listCurrencies() {
    this.currencies$ = this.commSvc.getCurrencies();
    this.currencies$.subscribe((res) => {
      this.currencies = res;
    });
  }

  getCurrency(event) {
    this.selectedCurrency = event.target.value;
    this.listUnpaidOrders();
  }

  getSupplier(event) {
    this.selectedSupplier = event.target.value;
    this.listUnpaidOrders();
  }

  listUnpaidOrders() {
    setTimeout(() => {
      this.invoices$ = this.accSvc
        .getunpaidorders()
        .pipe(
          map((items) =>
            items.filter(
              (item) =>
                item.CurrencyID == this.selectedCurrency &&
                item.SupplierID == this.selectedSupplier
            )
          )
        );
      this.invoices$.subscribe((result) => {
        this.invoices = result;
        this.rerender();
      });
    });
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

  getRows() {
    var table = $('#myTable').DataTable();
    if (table.rows({ selected: true }).count() == 0) {
      this.toastr.warning(':: No records selected to pay');
      //alert('No rows selected to approve');
    } else {
      const invoiceList: number[] = [];

      for (let i = 0; i < table.rows({ selected: true }).count(); i++) {
        let result = table.row(i).data()[4];
        console.log();
        invoiceList.push(
          Number(parseFloat(result.substring(4).replaceAll(',', '')))
        );
      }
    }
  }

  onSubmit() {
    this.getRows();
  }
}
