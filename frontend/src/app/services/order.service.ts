import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ORDER_CREATE_URL,
  ORDERS_FOR_CURRENT_USER_URL,
  ORDERS_URL,
} from '../shared/constants/urls';
import { Order } from '../shared/models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  create(order: Order) {
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(ORDERS_FOR_CURRENT_USER_URL);
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${ORDERS_URL}/${id}`);
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${ORDERS_URL}/${id}`);
  }
}
