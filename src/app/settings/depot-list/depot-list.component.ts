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
import { Depot } from 'src/app/interfaces/settings/depot';
import { CommonService } from 'src/app/services/settings/common.service';
import { DepotDetailsComponent } from './depot-details/depot-details.component';

@Component({
  selector: 'app-depot-list',
  templateUrl: './depot-list.component.html',
  styleUrls: ['./depot-list.component.css'],
})
export class DepotListComponent implements OnInit, AfterViewInit, OnDestroy {
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  depots$: Observable<Depot[]>;
  depots: Depot[] = [];

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
    this.listDepots();
  }

  listDepots() {
    setTimeout(() => {
      this.depots$ = this.commSvc.getDepots();
      this.depots$.subscribe((result) => {
        this.depots = result as Depot[];
        this.rerender();
      });
    });
  }

  openDialog(dep: any) {
    const modalRef = this.modalSvc.open(DepotDetailsComponent, {
      scrollable: true,
      windowClass: '',
      keyboard: false,
      backdrop: 'static',
      centered: true,
      size: 'md',
    });

    let data = {
      depotDetails: dep,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        if (result == 'success') {
          this.listDepots();
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
