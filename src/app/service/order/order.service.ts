import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/Models/Order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private id:number=0;
  private orderUrl = 'http://localhost:8082/order';
  private orderAdd = this.orderUrl+'/add';
  private orderUpdate = this.orderUrl+`/update/${this.id}`;


  constructor(private http: HttpClient) {}

   setId(id: number) {
    this.id = id;
    this.orderUpdate = `${this.orderUrl}/update/${this.id}`;
  }

  createOrder(payload: Order): Observable<Order> {
    payload.id=-1;
    return this.http.post<Order>(this.orderAdd, payload);
  }
  updateOrder(payload: Order): Observable<Order> {
    return this.http.put<Order>(this.orderUpdate, payload);
  }
  getOrders(): Observable<Order[]>  {
    return this.http.get<Array<Order>>(this.orderUrl);
  }

}
