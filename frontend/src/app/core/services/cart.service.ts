import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CartItem {
  id: number;
  watchId: number;
  watchName: string;
  watchBrand: string;
  watchPrice: number;
  watchImageUrl?: string;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${environment.apiUrl}/cart`);
  }

  addItem(watchId: number, quantity: number = 1): Observable<Cart> {
    return this.http.post<Cart>(`${environment.apiUrl}/cart/items?watchId=${watchId}&quantity=${quantity}`, {});
  }

  updateItemQuantity(itemId: number, quantity: number): Observable<Cart> {
    return this.http.put<Cart>(`${environment.apiUrl}/cart/items/${itemId}?quantity=${quantity}`, {});
  }

  removeItem(itemId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${environment.apiUrl}/cart/items/${itemId}`);
  }
}


