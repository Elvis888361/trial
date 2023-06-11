import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Depot } from 'src/app/interfaces/settings/depot';
import { CommonService } from 'src/app/services/settings/common.service';

@Component({
  selector: 'app-depot-details',
  templateUrl: './depot-details.component.html',
  styleUrls: ['./depot-details.component.css'],
})
export class DepotDetailsComponent implements OnInit {
  depot: any;

  depots$!: Observable<Depot[]>;
  depots: Depot[] = [];

  @Input() fromParent;

  constructor(
    public commSvc: CommonService,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.depot = this.fromParent.depotDetails;
    if (this.depot == null) {
      this.commSvc.initializeDepotForm();
    } else {
      this.commSvc.populateDepotForm(this.depot);
    }
  }

  onSubmit() {
    let data = this.commSvc.depotForm.value;
    if (data.DepotID == 0) {
      this.commSvc.adddepot(data).subscribe({
        next: (res) => {
          if (res['Message'] == 'Duplicate Record') {
            this.toastr.error(':: ' + res['responseObject']['Data']);
          }
          if (res['Message'] == 'Success') {
            this.commSvc.clearDepotCache();
            this.depots$ = this.commSvc.getDepots();
            this.depots$.subscribe((newList) => {
              this.depots = newList;
              this.toastr.success(
                ':: A new depot has been added successfully.'
              );
              this.closeModal('success');
            });
          }
        },
      });
    } else {
      let depotId: number;
      depotId = this.commSvc.depotForm.get('DepotID').value;
      this.commSvc.editdepot(depotId, data).subscribe({
        next: (res) => {
          if (res['Message'] == 'Duplicate Record') {
            this.toastr.warning(
              ':: Another record exist with the same details'
            );
          } else {
            this.commSvc.clearDepotCache();
            this.depots$ = this.commSvc.getDepots();
            this.depots$.subscribe((newList) => {
              this.depots = newList;
              this.toastr.info(':: Depot details updated successfully');
              this.closeModal('success');
            });
          }
        },
      });
    }
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
