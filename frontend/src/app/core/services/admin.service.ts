import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DashboardStats {
    totalRevenue: number;
    totalOrders: number;
    totalSales: number;
}

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiUrl = `${environment.apiUrl}/admin`;

    constructor(private http: HttpClient) { }

    getDashboardStats(): Observable<DashboardStats> {
        return this.http.get<DashboardStats>(`${this.apiUrl}/stats`);
    }
}
