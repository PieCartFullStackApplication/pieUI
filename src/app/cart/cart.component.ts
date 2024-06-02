import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/Models/Cart.mode';
import { CartService } from '../service/cart/cart.service';
import { OrderService } from '../service/order/order.service';
import { Order } from 'src/Models/Order.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService, private orderService: OrderService, private snackBar: MatSnackBar) { }

  deleteCartItem(cartItemId: number) {
    this.cartService.deleteCartItem(cartItemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
      },
      error: error => {
        console.error('Failed to delete cart item', error);
      }
    });
  }

  calculateTotalPrice(): number {
    let total = 0;
    this.cartItems.forEach(item => total += item.price);
    return total;
  }

  cartItems: Array<CartItem> = [];
  orderItems: Array<Order> = [];

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: response => {
        this.cartItems = response;
      },
      error: error => {
        console.error('Failed to fetch cart items:', error);
      }
    });
    this.orderService.getOrders().subscribe({
      next: response => {
        this.orderItems = response;
      },
      error: error => {
        console.error('Failed to fetch cart items:', error);
      }
    });
  }

  createOrder() {
    let orderItem: Order = {
      title: "Order" + (this.orderItems.length + 1),
      price: this.calculateTotalPrice(),
      productMap: this.getProductList(),
      id: 0,
      initDate: new Date()
    };
    this.orderService.createOrder(orderItem).subscribe({
      next: response => {
        this.orderItems.push(response);
        this.showSuccessMessage('Order created successfully');
        console.log(response);
      },
      error: error => {
        this.showErrorMessage('Error creating Order');
      }
    });
    
  }
  getProductList(): Array<string> {
    const list = new Array<string>();
    this.cartItems.forEach(item => {
      list.push(item.title);

    });
    return list;
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


