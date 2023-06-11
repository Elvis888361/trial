import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/settings/product';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private product$: Observable<Product[]>;
  constructor(private http: HttpClient) {}

  productForm: FormGroup = new FormGroup({
    ProductID: new FormControl(0),
    ProductName: new FormControl('', [Validators.required]),
    OtherName: new FormControl('', [Validators.required]),
    IsActive: new FormControl(true),
  });

  initializeProductForm() {
    this.productForm.setValue({
      ProductID: 0,
      ProductName: '',
      OtherName: '',
      IsActive: true,
    });
  }

  populateProductForm(record) {
    this.productForm.setValue({
      ProductID: record.ProductID,
      ProductName: record.ProductName,
      OtherName: record.OtherName,
      IsActive: record.IsActive,
    });
  }

  getProducts(): Observable<Product[]> {
    if (!this.product$) {
      this.product$ = this.http
        .get<Product[]>(environment.getproducts)
        .pipe(shareReplay());
    }
    //if product cache exist return it
    return this.product$;
  }

  addProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(environment.addproducts, data);
  }

  editProduct(id: number, data: Product): Observable<Product> {
    return this.http.put<Product>(environment.editproducts + id, data);
  }

  clearProductCache() {
    this.product$ = null;
  }
}
