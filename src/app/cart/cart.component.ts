import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/Models/Cart.mode';
import { CartService } from '../service/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Array<CartItem> = [];

  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: response => {
        this.cartItems = response;
      },
      error: error => {
        // Handle error
        console.error('Failed to fetch cart items:', error);
      }
    });
  }
}
