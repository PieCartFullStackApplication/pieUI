import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CartItem } from 'src/Models/Cart.mode';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private id:number=0;
  private cartUrl = 'http://localhost:8081/cart';
  private cartAdd = this.cartUrl+'/add';
  private cartUpdate = this.cartUrl+`/update/${this.id}`;
  private cartGetById = this.cartUrl+`/${this.id}`;


  constructor(private http: HttpClient) {}

   setId(id: number) {
    this.id = id;
    this.cartUpdate = `${this.cartUrl}/update/${this.id}`;
  }

  createCartItem(payload: CartItem): Observable<CartItem> {
    payload.id=-1;
    return this.http.post<CartItem>(this.cartAdd, payload);
  }
  updateCartItem(payload: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(this.cartUpdate, payload);
  }
  getCartItems(): Observable<CartItem[]>  {
    return this.http.get<Array<CartItem>>(this.cartUrl);
  }
  getCartItemById(id:number): Observable<CartItem>  {
    return this.http.get<CartItem>(this.cartGetById);
  }
  deleteCartItem(cartItemId: number): Observable<void> {
    const url = `${this.cartUrl}/${cartItemId}`;
    return this.http.delete<void>(url);
  }
}
