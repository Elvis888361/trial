import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TenderDetailsComponent } from './tender-details/tender-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { OtsTender } from 'src/app/interfaces/ots/ots-tender';
import { TenderService } from 'src/app/services/ots/tender.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-tender-list',
  templateUrl: './tender-list.component.html',
  styleUrls: ['./tender-list.component.css'],
})
export class TenderListComponent implements OnInit, AfterViewInit, OnDestroy {
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
      ordering: false,
    };
    this.listTenders();
  }

  listTenders() {
    setTimeout(() => {
      this.tenders$ = this.tenderSvc.getTenders();
      this.tenders$.subscribe((result) => {
        this.tenders = result as OtsTender[];
        this.rerender();
      });
    });
  }

  openDialog(tender: any) {
    const modalRef = this.modalSvc.open(TenderDetailsComponent, {
      scrollable: true,
      windowClass: '',
      keyboard: false,
      backdrop: 'static',
      centered: true,
      size: 'md',
    });

    let data = {
      tenderDetails: tender,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        if (result == 'success') {
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
