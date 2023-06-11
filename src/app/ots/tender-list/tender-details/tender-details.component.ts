import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { OtsTender } from 'src/app/interfaces/ots/ots-tender';
import { Month } from 'src/app/interfaces/settings/month';
import { Product } from 'src/app/interfaces/settings/product';
import { Supplier } from 'src/app/interfaces/settings/supplier';
import { Year } from 'src/app/interfaces/settings/year';
import { TenderService } from 'src/app/services/ots/tender.service';
import { CommonService } from 'src/app/services/settings/common.service';
import { ProductService } from 'src/app/services/settings/product.service';
import { SupplierService } from 'src/app/services/settings/supplier.service';

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrls: ['./tender-details.component.css'],
})
export class TenderDetailsComponent implements OnInit {
  tender: any;
  @Input() fromParent;

  tenders$: Observable<OtsTender[]>;
  tenders: OtsTender[] = [];

  suppliers$!: Observable<Supplier[]>;
  suppliers: Supplier[] = [];

  products$!: Observable<Product[]>;
  products: Product[] = [];

  years$!: Observable<Year[]>;
  years: Year[] = [];

  months$: Observable<Month[]>;
  months: Month[];

  constructor(
    public tenderSvc: TenderService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private commSvc: CommonService,
    private prodSvc: ProductService,
    private suppSvc: SupplierService
  ) {}

  // ngAfterViewInit(): void {
  //   const txtKes = document.getElementById('kes');
  //   txtKes.addEventListener((),())
  // }
  ngOnInit(): void {
    this.tender = this.fromParent.tenderDetails;
    if (this.tender == null) {
      this.tenderSvc.initializeTenderForm();
    } else {
      this.tenderSvc.populateTenderForm(this.tender);
    }
    this.listMonths();
    this.listProducts();
    this.listSuppliers();
    this.listYears();
  }

  listMonths() {
    this.months$ = this.commSvc.getMonths();
    this.months$.subscribe((res) => {
      this.months = res;
    });
  }

  listYears() {
    this.years$ = this.commSvc.getYears();
    this.years$.subscribe((res) => {
      this.years = res;
    });
  }

  listProducts() {
    this.products$ = this.prodSvc.getProducts();
    this.products$.subscribe((res) => {
      this.products = res;
    });
  }

  listSuppliers() {
    this.suppliers$ = this.suppSvc.getSuppliers();
    this.suppliers$.subscribe((res) => {
      this.suppliers = res;
    });
  }

  onSubmit() {
    let data = this.tenderSvc.tenderForm.value;
    if (data.OtsTenderID == 0) {
      this.tenderSvc.addtender(data).subscribe({
        next: (res) => {
          if (res['Message'] == 'Duplicate Record') {
            this.toastr.error(':: ' + res['responseObject']['Data']);
          }
          if (res['Message'] == 'Success') {
            this.tenderSvc.clearTenderCache();
            this.tenders$ = this.tenderSvc.getTenders();
            this.tenders$.subscribe((newList) => {
              this.tenders = newList;
              this.toastr.success(
                ':: A new tender has been added successfully.'
              );
              this.closeModal('success');
            });
          }
        },
      });
    } else {
      let tenderId: number;
      tenderId = this.tenderSvc.tenderForm.get('OtsTenderID').value;
      this.tenderSvc.edittender(tenderId, data).subscribe({
        next: (res) => {
          if (res['Message'] == 'Duplicate Record') {
            this.toastr.warning(
              ':: Another record exist with the same details'
            );
          } else {
            this.tenderSvc.clearTenderCache();
            this.tenders$ = this.tenderSvc.getTenders();
            this.tenders$.subscribe((newList) => {
              this.tenders = newList;
              this.toastr.info(':: Tender details updated successfully');
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
