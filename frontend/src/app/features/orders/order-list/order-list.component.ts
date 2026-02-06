import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService, Order, OrderPage } from '../../../core/services/order.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h1>Mes commandes</h1>
      <div *ngIf="orderPage && orderPage.content.length > 0; else noOrders">
        <div *ngFor="let order of orderPage.content" class="order-card">
          <div class="order-header">
            <h3>Commande {{ order.orderNumber }}</h3>
            <span class="status" [class]="'status-' + order.status.toLowerCase()">
              {{ getStatusLabel(order.status) }}
            </span>
          </div>
          <p class="order-date">Date: {{ order.createdAt | date:'dd/MM/yyyy HH:mm' }}</p>
          <div class="order-items">
            <div *ngFor="let item of order.items" class="order-item">
              <span>{{ item.watchName }} x {{ item.quantity }}</span>
              <span>{{ item.subtotal | number:'1.2-2' }} €</span>
            </div>
          </div>
          <div class="order-total">
            <strong>Total: {{ order.totalAmount | number:'1.2-2' }} €</strong>
          </div>
          <a [routerLink]="['/orders', order.id]" class="btn-primary">Voir les détails</a>
        </div>
      </div>
      <ng-template #noOrders>
        <p class="no-orders">Aucune commande pour le moment.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .order-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .status {
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
    }
    .status-pending {
      background: #ff9800;
      color: white;
    }
    .status-processing {
      background: #2196f3;
      color: white;
    }
    .status-shipped {
      background: #4caf50;
      color: white;
    }
    .order-items {
      margin: 15px 0;
    }
    .order-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    .order-total {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #ddd;
    }
  `]
})
export class OrderListComponent implements OnInit {
  orderPage: OrderPage | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getUserOrders(0, 10).subscribe(page => {
      this.orderPage = page;
    });
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'PENDING': 'En attente',
      'PROCESSING': 'En traitement',
      'SHIPPED': 'Expédiée',
      'DELIVERED': 'Livrée',
      'CANCELLED': 'Annulée'
    };
    return labels[status] || status;
  }
}


