import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/Models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private id:number=0;
  private productUrl = 'http://localhost:8080/product';
  private productAdd = this.productUrl+'/add';
  private productUpdate = this.productUrl+`/update/${this.id}`;
  private productFilterByType = this.productUrl+'/type';


  constructor(private http: HttpClient) {}

   setId(id: number) {
    this.id = id;
    this.productUpdate = `${this.productUrl}/update/${this.id}`;
  }

  createProduct(payload: Product): Observable<Product> {
    payload.id=-1;
    return this.http.post<Product>(this.productAdd, payload);
  }
  updateProduct(payload: Product): Observable<Product> {
    return this.http.put<Product>(this.productUpdate, payload);
  }
  getProducts(): Observable<Product[]>  {
    return this.http.get<Array<Product>>(this.productUrl);
  }

  deleteProduct(id:number): Observable<void>  {
    return this.http.delete<void>(this.productUrl+`/${this.id}`);
  }

}
