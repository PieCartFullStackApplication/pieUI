import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../service/cart/cart.service';
import { CartItem, CartItemMapper } from 'src/Models/Cart.mode';
import { ProductService } from '../service/product/product.service';
import { Product } from 'src/Models/Product.model';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  cartItems: Array<CartItem> = [];
  productItems: Array<Product> = [];
  constructor( private productService: ProductService, private cartService: CartService, private snackBar: MatSnackBar) { }
  addToCart(productItem: Product) {
    const cartItem:CartItem=CartItemMapper.mapProductToCartItem(productItem);
    this.cartService.createCartItem(cartItem).subscribe({
      next: response => {
        this.cartItems.push(response);
        this.showSuccessMessage('CartItem created successfully');
      },
      error: error => {
        this.showErrorMessage('Error creating cartItem');
      }
    });
  }

  // deleteProduct:any(product: Product) {
  //   product.title="wdwd";
  // }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: response => {
        this.productItems = response;
      },
      error: error => {
        this.showErrorMessage('Failed to fetch data items');
      }
    });
  }
  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

}
