import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { OtsTender } from 'src/app/interfaces/ots/ots-tender';
import { TenderService } from 'src/app/services/ots/tender.service';
import { DischargeDetailsComponent } from './discharge-details/discharge-details.component';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-discharge-list',
  templateUrl: './discharge-list.component.html',
  styleUrls: ['./discharge-list.component.css'],
})
export class DischargeListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  tenders$: Observable<OtsTender[]>;
  tenders: OtsTender[] = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(private tenderSvc: TenderService, private modalSvc: NgbModal) {}

  ngOnInit(): void {
    this.dtOptions = {
      autoWidth: true,
      responsive: true,
      select: true,
      processing: true,
      targets: 'no-sort',
      bSort: false,
    };
    this.listTenders();
  }

  listTenders() {
    setTimeout(() => {
      this.tenders$ = this.tenderSvc
        .getTenders()
        .pipe(map((items) => items.filter((item) => item.Discharged == false)));
      this.tenders$.subscribe((result) => {
        this.tenders = result as OtsTender[];
        this.rerender();
      });
    });
  }

  openDialog(tender: any) {
    const modalRef = this.modalSvc.open(DischargeDetailsComponent, {
      scrollable: true,
      windowClass: '',
      keyboard: false,
      backdrop: 'static',
      centered: true,
      size: 'lg',
    });

    let data = {
      OtsTenderID: tender.OtsTenderID,
      Vessel: tender.Vessel,
      DateRange: tender.DateRange,
      Allocation: tender.Allocation,
      Actual: tender.Actual,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        if (result == 'Success') {
          this.listTenders();
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
