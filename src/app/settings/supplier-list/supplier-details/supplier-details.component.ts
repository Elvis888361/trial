import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/interfaces/settings/supplier';
import { SupplierService } from 'src/app/services/settings/supplier.service';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css'],
})
export class SupplierDetailsComponent {
  currList;
  supplier: any;
  @Input() fromParent;
  suppliers$!: Observable<Supplier[]>;
  suppliers: Supplier[] = [];
  constructor(
    public supSvc: SupplierService,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.supplier = this.fromParent.supplierDetails;
    if (this.supplier == null) {
      this.supSvc.initializeSupplierForm();
    } else {
      this.supSvc.populateSupplierForm(this.supplier);
    }
  }

  onSubmit() {
    let data = this.supSvc.supplierForm.value;

    if (data.SupplierID == 0) {
      this.supSvc.addsupplier(data).subscribe({
        next: (res) => {
          if (res['Message'] == 'Duplicate Record') {
            this.toastr.error(':: ' + res['responseObject']['Data']);
          }
          if (res['Message'] == 'Success') {
            this.supSvc.clearSupplierCache();
            this.suppliers$ = this.supSvc.getSuppliers();
            this.suppliers$.subscribe((newList) => {
              this.suppliers = newList;
              this.toastr.success(
                ':: A new supplier has been added successfully.'
              );
              this.closeModal('success');
            });
          }
        },
      });
    } else {
      let supplierId: number;
      supplierId = this.supSvc.supplierForm.get('SupplierID').value;
      this.supSvc.editsupplier(supplierId, data).subscribe({
        next: (res) => {
          if (res['Message'] == 'Duplicate Record') {
            this.toastr.warning(
              ':: Another record exist with the same details'
            );
          } else {
            this.supSvc.clearSupplierCache();
            this.suppliers$ = this.supSvc.getSuppliers();
            this.suppliers$.subscribe((newList) => {
              this.suppliers = newList;
              this.toastr.info(':: Supplier details updated successfully');
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
