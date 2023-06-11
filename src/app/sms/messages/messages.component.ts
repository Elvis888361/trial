import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Chart, registerables } from 'node_modules/chart.js';
import { SmsService } from 'src/app/services/sms.service';
import { Message } from 'src/app/interfaces/message';
import { Station } from 'src/app/interfaces/station';
import { StationService } from 'src/app/services/settings/station.service';
import { Customer } from 'src/app/interfaces/customer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadComponent } from 'src/app/common/file-upload/file-upload.component';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

Chart.register(...registerables);

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, AfterViewInit, OnDestroy {
  selected: number;

  message: string;

  smsdata$: Observable<any[]>;
  smsdata: any[] = [];

  messages$: Observable<Message[]>;
  messages: Message[] = [];

  stations$: Observable<Station[]>;
  stations: Station[] = [];

  customers$: Observable<Customer[]>;
  customers: Customer[] = [];

  mpesaCustomers: any[] = [];

  labeldata: any[] = [];
  colordata: any[] = [];
  realdata: any[] = [];

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective, { static: true })
  dtElement: DataTableDirective;

  constructor(
    private smsSvc: SmsService,
    private stationSvc: StationService,
    private modalSvc: NgbModal,
    private toastrSvc: ToastrService
  ) {}

  ngOnInit(): void {
    this.listStations();
    // this.selectAllForDropdownItems(this.stations);

    this.getSmsData();

    this.dtOptions = {
      autoWidth: true,
      responsive: true,
      processing: true,
      searching: false,
      bLengthChange: false,
      select: true,
    };
    this.listCustomers();
    this.listMessages();
  }

  listMessages() {
    this.messages$ = this.smsSvc.getMessages();
    this.messages$.subscribe((result) => {
      this.messages = result as Message[];
      this.rerender();
    });
  }

  listStations() {
    this.stations$ = this.stationSvc.getStations();
    this.stations$.subscribe((result) => {
      this.stations = result as Station[];
    });
  }

  renderChart(labeldata: any, maindata: any, colordata: any) {
    const myChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: labeldata,
        datasets: [
          {
            label: '# of Sms',
            data: maindata,
            backgroundColor: colordata,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            grid: {
              display: true,
            },
          },
        },
      },
    });
  }

  getSmsData() {
    this.smsdata$ = this.smsSvc.getSmsData();
    this.smsdata$.subscribe((result) => {
      this.smsdata = result;
      if (this.smsdata != null) {
        for (let i = 0; i < this.smsdata.length; i++) {
          this.labeldata.push(this.smsdata[i].Type);
          this.colordata.push(this.smsdata[i].Color);
          this.realdata.push(this.smsdata[i].Count);
        }
        this.renderChart(this.labeldata, this.realdata, this.colordata);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  listCustomers() {
    this.customers$ = this.smsSvc.getCustomers();
    this.customers$.subscribe((result) => {
      this.customers = result;
    });
  }

  sendMessage(form: NgForm) {
    if (this.mpesaCustomers.length == 0) {
      this.toastrSvc.warning(':: Please select customers to send messages to');
    } else {
      let list = [];

      const customers = document
        .getElementById('list1')
        .querySelectorAll('li') as NodeListOf<HTMLLIElement>;
      for (let i = 0; i < customers.length; i++) {
        list.push(customers[i].id);
      }
      const formData = new FormData();

      formData.append('Message', form.value.message);
      formData.append('Receipients', list.join(','));

      // let data = {
      //   Message: form.value.message,
      //   Receipients: list.join(','),
      // };

      // console.log(data);

      //console.log(list.join(','));

      this.smsSvc.sendMessages(formData).subscribe((res) => {
        console.log(res);
      });
    }
  }

  onMaterialGroupChange(event) {
    let stationList = [];
    let customerList = [];
    const customerSet = new Set();

    for (let c of event) {
      stationList.push(c.StationID);
    }

    for (let c of this.customers) {
      let stationInt = [];
      c.CustomerStation.split(',').forEach(function (item) {
        stationInt.push(parseInt(item));
      });

      const isIncluded = stationInt.some((value) =>
        stationList.includes(value)
      );
      if (isIncluded == true) {
        customerSet.add(c.CustomerID);
      }
    }

    customerList = Array.from(customerSet);
    const cusSet = new Set();
    for (let i = 0; i < customerList.length; i++) {
      cusSet.add(
        this.customers.find((item) => item.CustomerID == customerList[i])
      );
    }

    this.mpesaCustomers = Array.from(cusSet);
  }

  // selectAllForDropdownItems(items: any[]) {
  //   let allSelect = (items) => {
  //     items.forEach((element) => {
  //       element['selectedAllGroup'] = 'selectedAllGroup';
  //     });
  //   };

  //   allSelect(items);
  // }

  openDialog() {
    const modalRef = this.modalSvc.open(FileUploadComponent, {
      scrollable: true,
      windowClass: '',
      keyboard: false,
      backdrop: 'static',
      centered: true,
      size: 'md',
    });

    modalRef.result.then(
      (result) => {
        if (result['Message'] == 'Success') {
          this.toastrSvc.success(result['Data']);
        } else if (result['Message'] == 'Mixed') {
          this.toastrSvc.warning(result['Data']);
        } else {
        }
      },
      (reason) => {}
    );
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
