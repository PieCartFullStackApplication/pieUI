import { Component, ViewChild } from '@angular/core';
import { Order } from 'src/Models/Order.model';
import { OrderService } from '../service/order/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {OnInit, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['product', 'price', 'productMap'];
  dataSource = new MatTableDataSource<Order>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.getOrders();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getOrders() {
    this.orderService.getOrders().subscribe(orders => {
      this.dataSource.data = orders;
    });
  }
}

