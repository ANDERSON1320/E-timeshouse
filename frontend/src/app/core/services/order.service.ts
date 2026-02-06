import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface OrderItem {
  id: number;
  watchId: number;
  watchName: string;
  watchBrand: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  totalAmount: number;
  status: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  items: OrderItem[];
  createdAt: string;
}

export interface OrderPage {
  content: Order[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface CreateOrderRequest {
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getUserOrders(page: number = 0, size: number = 10): Observable<OrderPage> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<OrderPage>(`${environment.apiUrl}/orders`, { params });
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${environment.apiUrl}/orders/${id}`);
  }

  createOrder(request: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(`${environment.apiUrl}/orders`, request);
  }

  updateOrderStatus(id: number, status: string): Observable<Order> {
    return this.http.put<Order>(`${environment.apiUrl}/admin/orders/${id}/status?status=${status}`, {});
  }
}


