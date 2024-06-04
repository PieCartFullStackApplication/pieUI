import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/Models/Product.model';
import { ProductType } from 'src/Models/ProductType.enum';
import { ProductService } from '../service/product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  toggleToUpdate() {
    this.mode = "update";
  }
  toggleToCreate() {
    this.mode = "create";
  }
  productItems:  Array<Product> = [];
  count: number = 1;

  @Input()
  product: Product = {} as Product;
  productType: Array<any> = Object.keys(ProductType).filter(key => isNaN(Number(key)));
  mode: any;
  constructor(private productService: ProductService, private snackBar: MatSnackBar) {}


  onSubmit(): void {
    if (this.product.price < 0) {
      this.showErrorMessage('Price must be greater than 0');
      return;
    }
    if (this.product.title == null || this.product.title == "") {
      this.showErrorMessage('Title must be non Empty');
      return;
    }
    if (this.product.productType == null || this.product.productType == undefined) {
      this.showErrorMessage('productType must be chosen');
      return;
    }
    const existingProductIndex = this.productItems.findIndex((item: Product)=> item.id === this.product.id);
    if (this.mode == "create") {
      this.productService.createProduct(this.product).subscribe({
        next: response => {
          this.productItems.push(response);
          this.showSuccessMessage('Product created successfully');
        },
        error: error => {
          this.showErrorMessage('Error creating product');
        }
      });
    } else {
      this.productService.setId(this.product.id);
      if (this.product.id < 0) {
        this.showErrorMessage('Error updating product');
      }
      else {
        this.productService.updateProduct(this.product).subscribe({
          next: response => {
            this.productItems[existingProductIndex] = response;
            this.showSuccessMessage('Product updated successfully');
          },
          error: error => {
            this.showErrorMessage('Error updating product');
          }
        });
      }
    }
    this.productService.getProducts().subscribe({
      next: response => {
        this.productItems= response;
      },
      error: error => {
        this.showErrorMessage('Failed to update data to items');
      }
    });
    console.log(this.productItems);
  }
  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}
