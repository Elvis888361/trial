import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/settings/product';
import { ProductService } from 'src/app/services/settings/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  products$!: Observable<Product[]>;
  products: Product[] = [];
  @Input() fromParent;

  constructor(
    public prodSvc: ProductService,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.product = this.fromParent.productDetails;
    if (this.product == null) {
      this.prodSvc.initializeProductForm();
    } else {
      this.prodSvc.populateProductForm(this.product);
    }
  }

  onSubmit() {
    let data = this.prodSvc.productForm.value;
    if (data.ProductID == 0) {
      this.prodSvc.addProduct(data).subscribe({
        next: (res) => {
          if (res['Message'] == 'Duplicate Record') {
            this.toastr.error(':: ' + res['responseObject']['Data']);
          }
          if (res['Message'] == 'Success') {
            this.prodSvc.clearProductCache();
            this.products$ = this.prodSvc.getProducts();
            this.products$.subscribe((newList) => {
              this.products = newList;
              this.toastr.success(
                ':: A new product has been added successfully.'
              );
              this.closeModal('success');
            });
          }
        },
      });
    } else {
      let productId: number;
      productId = this.prodSvc.productForm.get('ProductID').value;
      this.prodSvc.editProduct(productId, data).subscribe({
        next: (res) => {
          if (res['Message'] == 'Duplicate Record') {
            this.toastr.warning(
              ':: Another record exist with the same details'
            );
          } else {
            this.prodSvc.clearProductCache();
            this.products$ = this.prodSvc.getProducts();
            this.products$.subscribe((newList) => {
              this.products = newList;
              this.toastr.info(':: Product details updated successfully');
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
