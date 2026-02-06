import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Watch {
  id: number;
  name: string;
  description: string;
  brand: string;
  model: string;
  price: number;
  stockQuantity: number;
  categoryId?: number;
  categoryName?: string;
  images?: WatchImage[];
}

export interface WatchImage {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface ProductVariant {
  id: number;
  watchId: number;
  size: string;
  color: string;
  stockQuantity: number;
  priceAdjustment: number;
}

export interface WatchPage {
  content: Watch[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class WatchService {
  constructor(private http: HttpClient) { }

  getWatches(page: number = 0, size: number = 12, filters?: {
    brand?: string;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    availableOnly?: boolean;
  }): Observable<WatchPage> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filters?.brand) params = params.set('brand', filters.brand);
    if (filters?.categoryId) params = params.set('categoryId', filters.categoryId.toString());
    if (filters?.minPrice) params = params.set('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params = params.set('maxPrice', filters.maxPrice.toString());
    if (filters?.availableOnly) params = params.set('availableOnly', 'true');

    return this.http.get<WatchPage>(`${environment.apiUrl}/watches`, { params });
  }

  getWatchById(id: number): Observable<Watch> {
    return this.http.get<Watch>(`${environment.apiUrl}/watches/${id}`);
  }

  getWatchVariants(id: number): Observable<ProductVariant[]> {
    return this.http.get<ProductVariant[]>(`${environment.apiUrl}/watches/${id}/variants`);
  }

  createWatch(watch: Watch): Observable<Watch> {
    return this.http.post<Watch>(`${environment.apiUrl}/watches`, watch);
  }

  updateWatch(id: number, watch: Watch): Observable<Watch> {
    return this.http.put<Watch>(`${environment.apiUrl}/watches/${id}`, watch);
  }

  deleteWatch(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/watches/${id}`);
  }
}


