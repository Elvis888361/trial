import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/ots/order.service';

@Component({
  selector: 'app-outurn-changes',
  templateUrl: './outurn-changes.component.html',
  styleUrls: ['./outurn-changes.component.css'],
})
export class OuturnChangesComponent implements OnInit {
  @Input() fromParent;
  OtsOrderId;
  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    public orderSvc: OrderService
  ) {}

  ngOnInit(): void {
    this.OtsOrderId = this.fromParent.orderDetails.OtsOrderID;
    console.log(this.OtsOrderId);
    this.orderSvc.populateOuturnForm(this.fromParent.orderDetails);
  }
  onSubmit() {
    let data = this.orderSvc.outurnForm.value;
    this.orderSvc.clearCache();
    this.orderSvc.updateOuturn(this.OtsOrderId, data).subscribe((res) => {
      if (res['Message'] == 'Success') {
        this.toastr.success(':: Outurn vales updated succesfully');
        this.closeModal('success');
      } else {
        this.toastr.error(':: Your request failed. Check and try again');
      }
    });
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
