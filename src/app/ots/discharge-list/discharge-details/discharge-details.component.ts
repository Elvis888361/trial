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
import { Subject } from 'rxjs';
import { TenderService } from 'src/app/services/ots/tender.service';
import { DischargeItemComponent } from '../discharge-item/discharge-item.component';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/ots/order.service';

@Component({
  selector: 'app-discharge-details',
  templateUrl: './discharge-details.component.html',
  styleUrls: ['./discharge-details.component.css'],
})
export class DischargeDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() fromParent;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  dischargeHeader: any;
  OtsTenderID: number = 0;

  @ViewChild(DataTableDirective, { static: true })
  dtElement: DataTableDirective;

  actualQty = 0;

  constructor(
    public tenderSvc: TenderService,
    public activeModal: NgbActiveModal,
    private modalSvc: NgbModal,
    private toastr: ToastrService,
    private orderSvc: OrderService
  ) {}

  ngOnInit(): void {
    this.dischargeHeader = this.fromParent;
    this.OtsTenderID = this.fromParent.OtsTenderID;
    this.listDischargeDetails(this.OtsTenderID);
    this.dtOptions = {
      autoWidth: true,
      responsive: true,
      searching: false,
      bLengthChange: false,
      select: true,
    };
    this.tenderSvc.populateDischargeHeaderForm(this.dischargeHeader);
  }

  listDischargeDetails(id: number) {
    this.tenderSvc.getTenderDischargeInstructions(id).subscribe((res) => {
      this.tenderSvc.dischargeDetails = res;
      this.rerender();
    });
  }

  addDischargeItem(ItemIndex: any, OtsTenderID: number) {
    const modalRef = this.modalSvc.open(DischargeItemComponent, {
      scrollable: true,
      windowClass: '',
      keyboard: false,
      backdrop: 'static',
      centered: true,
      size: 'sm',
    });

    const sum = this.tenderSvc.dischargeDetails.reduce(
      (accumulator, object) => {
        return accumulator + object.Quantity;
      },
      0
    );

    let data = {
      ItemIndex: ItemIndex,
      Actual: Number(
        this.tenderSvc.dischargeHeaderForm.get('Actual').value - sum
      ),
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

  deleteDischarge(id: number) {}

  onSubmit() {
    let data = {
      Vessel: this.tenderSvc.dischargeHeaderForm.get('Vessel').value,
      Actual: this.tenderSvc.dischargeHeaderForm.get('Actual').value,
      Details: this.tenderSvc.dischargeDetails,
    };

    this.tenderSvc.clearTenderCache();
    this.orderSvc.clearCache();
    this.tenderSvc
      .postDischargeInstructions(this.OtsTenderID, data)
      .subscribe((res) => {
        if (res['Message'] == 'Success') {
          this.toastr.success(':: Discharge instructions added succesfully');
          this.closeModal('Success');
        } else {
          this.toastr.error(':: Your request failed. Check and try again');
        }
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

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
