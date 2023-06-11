import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupplierAccount } from 'src/app/interfaces/settings/supplier';
import { SupplierService } from 'src/app/services/settings/supplier.service';

@Component({
  selector: 'app-supplier-accounts',
  templateUrl: './supplier-accounts.component.html',
  styleUrls: ['./supplier-accounts.component.css'],
})
export class SupplierAccountsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  currency: number;
  currencyType: string;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  accounts$: Observable<SupplierAccount[]>;
  accounts: SupplierAccount[] = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(private supSvc: SupplierService) {}

  ngOnInit(): void {
    this.dtOptions = {
      autoWidth: true,
      responsive: true,
      select: true,
      processing: true,
      ordering: false,
    };
    this.currency = 1;
    this.currencyType = 'KES ';
    this.listSupplierBalances(this.currency);
  }

  listSupplierBalances(curr: number) {
    setTimeout(() => {
      this.accounts$ = this.supSvc
        .getSupplierAccount()
        .pipe(map((items) => items.filter((item) => item.CurrencyID == curr)));
      this.accounts$.subscribe((result) => {
        this.accounts = result as SupplierAccount[];
        this.rerender();
      });
    });
  }

  ngAfterViewInit(): void {
    const btnKes = document.getElementById('kes');
    const btnUsd = document.getElementById('usd');
    btnKes.classList.add('active');

    btnKes.addEventListener('click', () => {
      btnKes.classList.add('active');
      btnUsd.classList.remove('active');
      this.listSupplierBalances(1);
      this.currencyType = 'KES ';
    });

    btnUsd.addEventListener('click', () => {
      btnUsd.classList.add('active');
      btnKes.classList.remove('active');
      this.listSupplierBalances(2);
      this.currencyType = 'USD ';
    });

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
