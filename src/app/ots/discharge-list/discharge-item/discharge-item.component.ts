import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/interfaces/settings/customer';
import { Depot } from 'src/app/interfaces/settings/depot';
import { Destination } from 'src/app/interfaces/settings/destination';
import { TenderService } from 'src/app/services/ots/tender.service';
import { CommonService } from 'src/app/services/settings/common.service';
import { CustomerService } from 'src/app/services/settings/customer.service';

@Component({
  selector: 'app-discharge-item',
  templateUrl: './discharge-item.component.html',
  styleUrls: ['./discharge-item.component.css'],
})
export class DischargeItemComponent implements OnInit {
  @Input() fromParent;

  customers$!: Observable<Customer[]>;
  customers: Customer[] = [];

  depots$!: Observable<Depot[]>;
  depots: Depot[] = [];

  destinations$!: Observable<Destination[]>;
  destinations: Destination[] = [];

  selectedDepot = null;
  selectedDestination = null;
  selectedCustomer = null;

  qty = 0;

  constructor(
    public tenderSvc: TenderService,
    private activeModal: NgbActiveModal,
    private commSvc: CommonService,
    private cusSvc: CustomerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.listCustomers();
    this.listDepots();
    this.listDestinations();

    if (this.fromParent.ItemIndex == null) {
      this.tenderSvc.initializeDischargeItemForm();
    } else {
      this.tenderSvc.populateDischargeItemForm(
        this.tenderSvc.dischargeDetails[this.fromParent.ItemIndex]
      );
    }
  }

  listDepots() {
    this.depots$ = this.commSvc.getDepots();
    this.depots$.subscribe((res) => {
      this.depots = res;
    });
  }

  listDestinations() {
    this.destinations$ = this.commSvc.getDestinations();
    this.destinations$.subscribe((res) => {
      this.destinations = res;
    });
  }

  listCustomers() {
    this.customers$ = this.cusSvc.getCustomers();
    this.customers$.subscribe((res) => {
      this.customers = res;
    });
  }

  depotChange(event) {
    const result = this.depots
      .filter((item) => item.DepotID == event.target.value)
      .find((item) => item.DepotID == event.target.value);

    this.selectedDepot = result.DepotName;
  }

  destinationChange(event) {
    const result = this.destinations
      .filter((item) => item.DestinationID == event.target.value)
      .find((item) => item.DestinationID == event.target.value);

    this.selectedDestination = result.DestinationName;
  }

  customerChange(event) {
    const result = this.customers
      .filter((item) => item.CustomerID == event.target.value)
      .find((item) => item.CustomerID == event.target.value);

    this.selectedCustomer = result.CustomerName;
  }

  onSubmit() {
    let data = this.tenderSvc.dischargeItemForm.value;

    if (this.fromParent.ItemIndex == null) {
      this.qty = this.fromParent.Actual;
    } else {
      this.qty =
        this.fromParent.Actual +
        this.tenderSvc.dischargeDetails[this.fromParent.ItemIndex]['Quantity'];
    }

    if (data['Quantity'] > this.qty) {
      this.toastr.warning(':: Quantity exceeds available balance to allocate');
    } else {
      data.DepotName =
        this.selectedDepot == null
          ? this.tenderSvc.dischargeDetails[this.fromParent.ItemIndex][
              'DepotName'
            ]
          : this.selectedDepot;
      data.DestinationName =
        this.selectedDestination == null
          ? this.tenderSvc.dischargeDetails[this.fromParent.ItemIndex][
              'DestinationName'
            ]
          : this.selectedDestination;
      data.CustomerName =
        this.selectedCustomer == null
          ? this.tenderSvc.dischargeDetails[this.fromParent.ItemIndex][
              'CustomerName'
            ]
          : this.selectedCustomer;

      if (this.fromParent.ItemIndex == null) {
        this.tenderSvc.dischargeDetails.push(data);
      } else {
        this.tenderSvc.dischargeDetails[this.fromParent.ItemIndex] = data;
      }

      this.closeModal('close');
    }
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
