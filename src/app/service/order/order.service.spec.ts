import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { Order } from 'src/Models/Order.model';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService]
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return orders', () => {
    const dummyOrders: Order[] = [
      { id: 1, title: 'Order 1', price: 10, productMap: ['Product 1', 'Product 2'], initDate: new Date() },
    ];
    service.getOrders().subscribe(orders => {
      expect(orders).toEqual(dummyOrders);
    });

    const req = httpMock.expectOne('http://localhost:8082/order');
    expect(req.request.method).toBe('GET');
    req.flush(dummyOrders);
  });

  it('should create an order', () => {
    const newOrder: Order = { id: 1, title: 'Order 1', price: 10, productMap: ['Product 1'], initDate: new Date() };
    service.createOrder(newOrder).subscribe(order => {
      expect(order).toEqual(newOrder);
    });

    const req = httpMock.expectOne('http://localhost:8082/order/add');
    expect(req.request.method).toBe('POST');
    req.flush(newOrder);
  });

});
